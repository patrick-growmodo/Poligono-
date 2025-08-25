import React from 'react'
import ProductCard from './ProductCard'
import Image from 'next/image'

const AIRecommendation: React.FC = () => {
  const products = [
    {
      image: '/images/gallery/Sneaker1.png',
      title: 'Sneakers Off-White 2024',
      vendor: 'Nike',
      price: '$36.00'
    },
    {
      image: '/images/gallery/Sneaker2.png',
      title: 'Sneakers Off-White 2024',
      vendor: 'Nike',
      price: '$36.00'
    },
    {
      image: '/images/gallery/Sneaker3.png',
      title: 'Sneakers Off-White 2024',
      vendor: 'Nike',
      price: '$36.00'
    }
  ]

  return (
    <section className="bg-white pt-[0px] pb-[24px] px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1140px] mx-auto bg-[url('/images/hero/ai_card.png')] rounded-20 bg-cover bg-center bg-no-repeat pt-[36px] pb-[31px]">
        {/* AI Chat Notification */}
        <div className="mb-8">
          <div className="bg-white opacity-[0.61] rounded-xl p-[19.124px] w-[90%] sm:w-[90%] md:w-[90%] lg:w-[656.28px] mx-auto shadow-lg md:max-w-sm lg:max-w-md ">
            <div className="flex items-start space-x-3">
              {/* AI Avatar */}
              <div className="w-[64.073px] h-[64.073px]  flex items-center justify-center flex-shrink-0">
                <Image src="/images/icons/stars.png" className="shadow-custom-3 rounded-full" alt="AI Avatar" width={64.073} height={64.073} />
              </div>
              
              {/* Chat Content */}
              <div className="flex-1">
                <h4 className="font-roboto font-medium text-sm text-purple-600 mb-1">
                  Poligono AI Agent
                </h4>
                <p className="font-roboto text-sm text-gray-700 leading-relaxed">
                  Hey Ana, based on your last purchase, here are 3 sneakers we think you'll love — take a look! 👟
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Product Cards Container */}
                 <div className="xl:w-[656.28px] lg:w-[656px] md:w-[90%] w-[70%] mx-auto bg-white rounded-xl p-[10.835px] shadow-lg ">
           <div 
             className="grid grid-cols-1 md:grid-cols-3 gap-[11.918px] bg-white "
           > {/* card_container */}
            {products.map((product, index) => (
              <ProductCard
                key={index}
                image={product.image}
                title={product.title}
                vendor={product.vendor}
                price={product.price}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default AIRecommendation 