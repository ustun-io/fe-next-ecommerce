interface IName {
  productName: string
}

export const Name = ({ productName }: IName) => {
  return (
    <div className="w-full h-auto">
      <h5 className="text-lines-2 pr-1 text-primary-700 dark:text-cool-gray-50 font-medium font-inter leading-6 h-12">
        {productName}
      </h5>
    </div>
  )
}
