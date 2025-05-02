import React from 'react'
import { Link } from 'react-router-dom'

const ReadMe = () => {
    return (
        <div class="max-w-3xl mx-auto px-4 py-8">
            <h1 class="text-3xl font-bold mb-6 text-center text-blue-600">How To Use My Twitter Clone App</h1>

            <section class="mb-10">
                <h2 class="text-2xl font-semibold mb-4 text-gray-800">Main Features</h2>
                <ul class="list-decimal list-inside space-y-2 text-gray-700">
                    <li class="text-lg">Login/Signup</li>
                    <li class="text-lg">Create Post</li>
                    <li class="text-lg">Follow/Unfollow</li>
                    <li class="text-lg">Like/Unlike Post</li>
                    <li class="text-lg">Delete Post</li>
                </ul>
            </section>

            <section>
                <h2 class="text-2xl font-semibold mb-4 text-gray-800">How To Use</h2>

                <div class="mb-6">
                    <Link to={'/login'}><h3 class="text-xl font-medium text-blue-500 mb-2">1. Login/Signup</h3></Link>
                    <p class="text-gray-700">To use this app, you need to login or signup. Click on the login button at the top right corner of the page.</p>
                </div>

                <div class="mb-6">
                    <Link to={'/'}><h3 class="text-xl font-medium text-blue-500 mb-2">2. Create Post</h3></Link>
                    <p class="text-gray-700">After logging in, create a post by clicking the "Post" button on the top right corner.</p>
                </div>

                <div class="mb-6">
                    <h3 class="text-xl font-medium text-blue-500 mb-2">3. Follow/Unfollow</h3>
                    <p class="text-gray-700">To use follow/unfollow, you need at least two user accounts.</p>
                    <p class="text-gray-700">You can follow or unfollow others by clicking the follow/unfollow button on their profile page.</p>
                </div>

                <div class="mb-6">
                    <h3 class="text-xl font-medium text-blue-500 mb-2">4. Like/Unlike Post</h3>
                    <p class="text-gray-700">Like or unlike a post by clicking the like/unlike button on the post.</p>
                </div>

                <div class="mb-6">
                    <h3 class="text-xl font-medium text-blue-500 mb-2">5. Delete Post</h3>
                    <p class="text-gray-700">To delete a post, click the delete button on the post.</p>
                </div>
            </section>
        </div>

    )
}

export default ReadMe