import React from 'react';
import Banner from './homeRes/Banner';
import StorySection from './homeRes/StorrySection';
import QuickLinksBox from './homeRes/QuickLinksBox';
import NewsCards from './homeRes/NewsCards'

function HomePage() {
  const sentences = [
    "Welcome to our website!",
    "Discover amazing products.",
    "Join our community today.",
    "Learn something new every day.",
    "Explore the world with us."
  ];

  return (
    <div>
      <Banner />
      <StorySection />
      <QuickLinksBox/>
      <NewsCards sentences={sentences}/>
    </div>
  );
}

export default HomePage;
