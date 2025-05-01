/**
 * API Sync Service
 * 
 * Responsible for syncing data from external APIs (LinkedIn, GitHub, Google Drive)
 * on configurable intervals and storing in the database
 */

import { db } from "@db";
import { profile, githubStats, resumeCV } from "@shared/schema";
import { eq } from "drizzle-orm";
import { linkedinAPI } from "../api/linkedinAPI";
import { githubAPI } from "../api/githubAPI";
import { googleDriveAPI } from "../api/googleDriveAPI";
import { linkedinConfig, githubConfig, googleDriveConfig } from "../config";

// Track interval IDs so they can be cleared if needed
let linkedinIntervalId: NodeJS.Timeout | null = null;
let githubIntervalId: NodeJS.Timeout | null = null;
let googleDriveIntervalId: NodeJS.Timeout | null = null;

/**
 * Initialize all API sync processes
 */
export function initializeApiSync() {
  // Start LinkedIn sync
  syncLinkedInProfile();
  linkedinIntervalId = setInterval(syncLinkedInProfile, linkedinConfig.refreshInterval);
  
  // Start GitHub sync
  syncGitHubStats();
  githubIntervalId = setInterval(syncGitHubStats, githubConfig.refreshInterval);
  
  // Start Google Drive sync
  syncGoogleDriveCV();
  googleDriveIntervalId = setInterval(syncGoogleDriveCV, googleDriveConfig.refreshInterval);
  
  console.log('API sync services initialized');
}

/**
 * Manually trigger refreshes (for admin panel use)
 */
export async function manuallyRefreshAll() {
  await Promise.all([
    syncLinkedInProfile(),
    syncGitHubStats(),
    syncGoogleDriveCV()
  ]);
  return { success: true, message: 'All external APIs refreshed' };
}

/**
 * Sync LinkedIn profile data
 */
async function syncLinkedInProfile() {
  try {
    console.log('Syncing LinkedIn profile data...');
    const profileData = await linkedinAPI.getProfile();
    
    // Update database with latest profile data
    // Check if a profile already exists
    const existingProfile = await db.query.profile.findFirst();
    
    if (existingProfile) {
      // Update existing profile
      await db.update(profile)
        .set(profileData)
        .where(eq(profile.id, existingProfile.id));
    } else {
      // Insert new profile
      await db.insert(profile).values(profileData);
    }
    
    console.log('LinkedIn profile data synced successfully');
  } catch (error) {
    console.error('Error syncing LinkedIn profile:', error);
  }
}

/**
 * Sync GitHub stats
 */
async function syncGitHubStats() {
  try {
    console.log('Syncing GitHub stats...');
    const githubData = await githubAPI.getStats();
    
    // Update database with latest GitHub stats
    const existingStats = await db.query.githubStats.findFirst();
    
    if (existingStats) {
      // Update existing stats
      await db.update(githubStats)
        .set(githubData)
        .where(eq(githubStats.id, existingStats.id));
    } else {
      // Insert new stats
      await db.insert(githubStats).values(githubData);
    }
    
    console.log('GitHub stats synced successfully');
  } catch (error) {
    console.error('Error syncing GitHub stats:', error);
  }
}

/**
 * Sync Google Drive CV/resume
 */
async function syncGoogleDriveCV() {
  try {
    console.log('Syncing Google Drive CV/resume...');
    const cvData = await googleDriveAPI.getCV();
    
    // Update database with latest CV data
    const existingCV = await db.query.resumeCV.findFirst();
    
    if (existingCV) {
      // Update existing CV
      await db.update(resumeCV)
        .set({
          title: cvData.title,
          fileUrl: cvData.fileUrl,
          isActive: cvData.isActive,
          uploadedAt: cvData.uploadedAt
        })
        .where(eq(resumeCV.id, existingCV.id));
    } else {
      // Insert new CV
      await db.insert(resumeCV).values({
        title: cvData.title,
        fileUrl: cvData.fileUrl,
        isActive: cvData.isActive,
        uploadedAt: cvData.uploadedAt
      });
    }
    
    console.log('Google Drive CV/resume synced successfully');
  } catch (error) {
    console.error('Error syncing Google Drive CV/resume:', error);
  }
}

/**
 * Clean up intervals when shutting down
 */
export function stopApiSync() {
  if (linkedinIntervalId) clearInterval(linkedinIntervalId);
  if (githubIntervalId) clearInterval(githubIntervalId);
  if (googleDriveIntervalId) clearInterval(googleDriveIntervalId);
  
  console.log('API sync services stopped');
}
