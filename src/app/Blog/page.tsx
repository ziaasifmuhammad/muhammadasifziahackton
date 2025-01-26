import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaCalendar, FaUserAlt } from 'react-icons/fa';
import { GiWoodenChair } from 'react-icons/gi';
import Page from '@/component/Ourpage';
import Field from '@/component/Field';


const Blog: React.FC = () => {
  return (
    <div className="max-w-screen-2xl container mx-auto pb-8 px-4">
      {/* Banner Section */}
      <div className="relative text-black">
        <Image
          src="/driller.jpg"
          alt="Shop Banner"
          height={400}
          width={600}
          className="w-full h-[200px] md:h-[400px] object-cover"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <h1 className="text-xl md:text-5xl font-semibold">Blog</h1>
          <div className="mt-4 text-gray-700 text-xs md:text-lg flex items-center">
            <Link href="/" className="font-bold hover:underline">
              Home
            </Link>
            <span className="font-bold mx-2">{'>'}</span>
            <Link href="/blog" className="hover:underline">
              Blog
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row mt-8 gap-8">
        {/* Blog Posts Section */}
        <div className="w-full lg:w-3/4 space-y-6">
          {[
            {
              image: '/lift 4.jpg',
              title: 'German Technology',
              category: 'Material Lifting',
              date: '01 Jan 2025',
            },
            {
              image: '/lift 6.jpg',
              title: 'Exploring New Ideas for Shifting Material',
              category: '400 Feet Lift',
              date: '01 Jan 2000',
            },
            {
              image: '/lift 7.jpg',
              title: 'Every Construction Requires',
              category: 'Column Box Concrete Lift Machine, 2hp-10hp',
              date: '20 Sep 2023',
            },
          ].map((post, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md transition-shadow hover:shadow-lg">
              <Image
                src={post.image}
                height={300}
                width={500}
                alt={`Image for ${post.title}`}
                className="rounded-t-lg"
              />
              <div className="flex items-center space-x-4 mt-3 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <FaUserAlt />
                  <p>Admin</p>
                </div>
                <div className="flex items-center space-x-1">
                  <FaCalendar />
                  <p>{post.date}</p>
                </div>
                <div className="flex items-center space-x-1">
                  <GiWoodenChair />
                  <p>{post.category}</p>
                </div>
              </div>
              <h2 className="text-xl font-semibold mt-4">{post.title}</h2>
              <p className="mt-2 text-gray-700 line-clamp-3">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iure aperiam dolores modi
                non quas cum nam aliquid molestias iste quod cumque optio tenetur doloribus
                dignissimos.
              </p>
              <Link
                href={`/blog/post-id-${index + 1}`}
                className="mt-4 inline-block text-primary underline underline-offset-4"
              >
                Read More
              </Link>
            </div>
          ))}
        </div>

        {/* Sidebar Section */}
        <div className="w-full lg:w-1/4 space-y-8">
          {/* Categories */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">Categories</h3>
            <ul className="space-y-4 text-gray-700">
              {[
                { name: 'Performance', count: 2 },
                { name: 'Design', count: 8 },
                { name: '4 Horsepower', count: 7 },
                { name: 'Heavy Work', count: 1 },
                { name: 'Metal', count: 6 },
              ].map((category, index) => (
                <li key={index} className="flex justify-between text-sm">
                  <span>{category.name}</span>
                  <span>{category.count}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Recent Posts */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">Recent Posts</h3>
            <div className="space-y-4">
              {[
                { image: '/lift 1.jpg', title: 'Small Heavy Duty Lifting Machine', date: '03 Aug 2022' },
                { image: '/lift 2.jpg', title: 'Small Warehouse Machine', date: '03 Aug 2022' },
                { image: '/lift 5.jpg', title: 'Heavy Duty Medium Lifter', date: '03 Aug 2022' },
                { image: '/lift 7.jpg', title: 'Advanced Technology', date: '03 Aug 2022' },
                { image: '/list 5.jpg', title: 'Small Material Mixing Machine', date: '03 Aug 2022' },
              ].map((post, index) => (
                <div key={index} className="flex space-x-3">
                  <Image src={post.image} height={100} width={100} alt={post.title} className="rounded-lg" />
                  <div>
                    <h4 className="text-md font-semibold">{post.title}</h4>
                    <p className="text-sm text-gray-600">{post.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Pagination and Other Components */}
      <div className="flex justify-center mt-10">
        <Page/>
        <Field/>
        
      </div>
    </div>
  );
};

export default Blog;
