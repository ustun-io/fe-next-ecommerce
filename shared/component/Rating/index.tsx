import { decimalCount, toDecimal } from '@shared/util'
import Rater from 'react-rater'

interface IRating {
  rating: number
  readOnly?: boolean
  handleClick: any
}

const Rating = ({ rating, readOnly, handleClick }: IRating) => {
  let roundedRating = Math.round(rating)
  let starsLeft = Math.abs(roundedRating - 5)

  if (readOnly) {
    if (!rating) {
      return (
        <div className={'flex items-center'}>
          {[...Array(roundedRating)].map((star, index) => (
            <span key={index} className="text-blue-900 dark:text-blue-300">
              &#9733;
            </span>
          ))}
          {[...Array(starsLeft)].map((star, index) => (
            <span key={index} className="text-secondary-100 dark:text-blue-300">
              &#9733;
            </span>
          ))}
          <p className={'text-xs ml-1'}>({0})</p>
        </div>
      )
    }

    return (
      <div className={'flex items-center'}>
        {[...Array(roundedRating)].map((star, index) => (
          <span key={index} className="text-blue-900 dark:text-blue-200">
            &#9733;
          </span>
        ))}
        {[...Array(starsLeft)].map((star, index) => (
          <span key={index} className="text-secondary-100 dark:text-secondary-800">
            &#9733;
          </span>
        ))}
        {decimalCount(rating) > 0 ? (
          <p className={'text-xs ml-1 mt-1'}>({toDecimal(rating, 1)})</p>
        ) : (
          <p className={'text-xs ml-1 mt-1'}>({rating})</p>
        )}
      </div>
    )
  } else {
    return <Rater onRate={handleClick} rating={rating} total={5} />
  }
}

Rating.defaultProps = {
  rating: 0,
  readOnly: true,
  handleClick: () => {}
}

export default Rating
