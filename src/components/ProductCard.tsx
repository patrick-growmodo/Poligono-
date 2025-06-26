import React from 'react'
import Image from 'next/image'

interface ProductCardProps {
  image: string
  title: string
  vendor: string
  price: string
}

const ProductCard: React.FC<ProductCardProps> = ({ image, title, vendor, price }) => {

  return (
    <div className="bg-white rounded-lg p-4 flex flex-col rounded-13 shadow-custom">
      {/* Product Image */}
      <div className="mb-3 rounded-lg overflow-hidden flex justify-center">
        <Image
          src={image}
          alt={title}

          width={177.53}
          height={131.39}
          className="object-cover rounded-[5.429px] w-[100%] md:w-[100%] lg:w-[100%]"
        /> 
      </div>

      {/* Product Info */}
      <div className="flex justify-between">
        <div className="w-[93px]">
        <h3 className="font-inter font-bold text-[9.751px] text-black mb-[4.89px]">{title}</h3>
        <p className="text-[7.601px] text-gray-600 mb-[4.89px] font-montserrat font-normal uppercase">{vendor}</p>
        <p className="font-montserrat text-black font-bold  text-[9.23px]">{price}</p>
        </div> 
       
        {/* Price and Add Button */}
        <div className="flex items-start justify-between">
          
          <button className="p-[5.429px] bg-[#6940E4] rounded-full flex items-center justify-center hover:bg-[#6940E4] transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
             <path d="M7.20384 4.27427L0.545553 4.27427L0.545553 2.99734L7.20384 2.99734L7.20384 4.27427ZM4.48276 7.04096L3.28184 7.04096L3.28184 0.230648L4.48276 0.230648L4.48276 7.04096Z" fill="white"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard 