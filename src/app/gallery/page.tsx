'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Camera, Grid, List, Calendar, Users, Heart, MessageCircle, Upload, Filter } from 'lucide-react';

// Mock data for demonstration
const mockPhotos = [
  {
    id: 1,
    url: '/api/placeholder/400/300',
    title: 'Birthday Party Fun',
    date: '2025-09-25',
    uploadedBy: 'Mom',
    likes: 5,
    comments: 3,
    type: 'image'
  },
  {
    id: 2,
    url: '/api/placeholder/400/300',
    title: 'First Steps!',
    date: '2025-09-20',
    uploadedBy: 'Dad',
    likes: 12,
    comments: 8,
    type: 'video'
  },
  {
    id: 3,
    url: '/api/placeholder/400/300',
    title: 'Family Picnic',
    date: '2025-09-15',
    uploadedBy: 'Grandma',
    likes: 7,
    comments: 2,
    type: 'image'
  },
  {
    id: 4,
    url: '/api/placeholder/400/300',
    title: 'Bedtime Stories',
    date: '2025-09-10',
    uploadedBy: 'Mom',
    likes: 9,
    comments: 5,
    type: 'image'
  },
  {
    id: 5,
    url: '/api/placeholder/400/300',
    title: 'Playground Adventures',
    date: '2025-09-05',
    uploadedBy: 'Dad',
    likes: 6,
    comments: 1,
    type: 'video'
  },
  {
    id: 6,
    url: '/api/placeholder/400/300',
    title: 'Cooking Together',
    date: '2025-09-01',
    uploadedBy: 'Grandpa',
    likes: 8,
    comments: 4,
    type: 'image'
  }
];

export default function GalleryPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filter, setFilter] = useState<'all' | 'photos' | 'videos'>('all');

  // Redirect if not authenticated
  if (status === 'unauthenticated') {
    router.push('/auth/signin');
    return null;
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading family gallery...</p>
        </div>
      </div>
    );
  }

  const filteredPhotos = mockPhotos.filter(photo => {
    if (filter === 'photos') return photo.type === 'image';
    if (filter === 'videos') return photo.type === 'video';
    return true;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Camera className="h-8 w-8 text-indigo-600" />
              <span className="text-xl font-bold text-gray-900">PhotoShare</span>
              <span className="text-sm text-gray-500">Family</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                href="/upload" 
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                <Upload className="h-4 w-4 mr-1" />
                Upload
              </Link>
              <Link 
                href="/dashboard" 
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Dashboard
              </Link>
              <span className="text-sm text-gray-600">
                {session?.user?.name}
              </span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Family Gallery
            </h1>
            <p className="text-gray-600">
              Your precious family moments, safely stored and beautifully organized
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          {/* Filters */}
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                filter === 'all' 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              All ({mockPhotos.length})
            </button>
            <button
              onClick={() => setFilter('photos')}
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                filter === 'photos' 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Photos ({mockPhotos.filter(p => p.type === 'image').length})
            </button>
            <button
              onClick={() => setFilter('videos')}
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                filter === 'videos' 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Videos ({mockPhotos.filter(p => p.type === 'video').length})
            </button>
          </div>

          {/* View Mode */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md ${
                viewMode === 'grid' 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md ${
                viewMode === 'list' 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Gallery */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredPhotos.map((photo) => (
              <div key={photo.id} className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow">
                <div className="aspect-square bg-gray-200 relative">
                  {photo.type === 'video' && (
                    <div className="absolute top-2 right-2 bg-black bg-opacity-50 rounded-full p-1">
                      <Camera className="h-4 w-4 text-white" />
                    </div>
                  )}
                  <div className="w-full h-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
                    <Camera className="h-12 w-12 text-indigo-400" />
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-gray-900 mb-1">{photo.title}</h3>
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                    <span>by {photo.uploadedBy}</span>
                    <span>{formatDate(photo.date)}</span>
                  </div>
                  <div className="flex items-center space-x-4 text-xs text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Heart className="h-3 w-3" />
                      <span>{photo.likes}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageCircle className="h-3 w-3" />
                      <span>{photo.comments}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
            {filteredPhotos.map((photo, index) => (
              <div key={photo.id} className={`flex items-center p-4 hover:bg-gray-50 ${index !== filteredPhotos.length - 1 ? 'border-b' : ''}`}>
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg flex items-center justify-center mr-4">
                  <Camera className="h-6 w-6 text-indigo-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{photo.title}</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                    <span>by {photo.uploadedBy}</span>
                    <span>{formatDate(photo.date)}</span>
                    <span className="capitalize">{photo.type}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Heart className="h-4 w-4" />
                    <span>{photo.likes}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MessageCircle className="h-4 w-4" />
                    <span>{photo.comments}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredPhotos.length === 0 && (
          <div className="text-center py-12">
            <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No photos yet</h3>
            <p className="text-gray-600 mb-4">Start building your family memories!</p>
            <Link 
              href="/upload"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload First Photo
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
