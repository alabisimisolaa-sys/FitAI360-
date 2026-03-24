import React, { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import './page.css'; // Import for animations

const Page: React.FC = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true, // Trigger animation only once
  });

  return (
    <div ref={ref} className={`page-container ${inView ? 'fade-in' : ''}`}> 
      <h1>Welcome to FitAI360</h1>
      <p>Enhancing your fitness journey with AI!</p> 
    </div>
  );
};

export default Page;