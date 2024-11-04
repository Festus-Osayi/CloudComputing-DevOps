import styled from "styled-components";
import Input from "../input/Input";
import { WhiteBox } from "../reusable-styles/WhiteBox";
import StarsRating from "../starsrating/StarsRating";
import TextArea from "../input/TextArea";
import Buttons from "../buttons/Buttons";
import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../spinner/Spinner";
import { dateFormatter } from "@/lib/date";

/** styling */
const Title = styled.h2`
  font-size: 1.2rem;
  margin-bottom: 5px;
`;
const ColWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  margin-bottom: 40px;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    gap: 40px;
  }
`;
const SubTitle = styled.h3`
  font-size: 1rem;
  margin-top: 5px;
`;

const ReviewsWrapper = styled.div`
  margin-bottom: 10px;
  border-top: 1px solid #ddd;
  padding: 10px 0;
  h3 {
    margin: 0;
    font-size: 1rem;
    color: #333;
  }
  p {
    margin: 0;
    font-size: 0.7rem;
    line-height: 1rem;
    color: #555;
  }
`;

const ReviewsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  time {
    color: #aaa;
  }
`;

export default function ProductsReviews({ products }) {
  /********** application states **********/
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [stars, setStars] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [isReviewsLoading, setIsReviewsLoading] = useState(true);
  /****************************************/

  /** functionality to submit a review */
  function submitReview() {
    const data = { title, description, stars, product: products._id };
    axios.post("/api/reviews", data).then(() => {
      setTitle("");
      setDescription("");
      setStars(0);
      // get the reviews again after submitting one new review
      getReviews();
    });
  }

  /**
   * make a get request to reviews endpoint
   * update our state with the result returned
   */
  function getReviews() {
    setIsReviewsLoading(true);
    axios.get(`/api/reviews?product=${products._id}`).then((res) => {
      setReviews(res.data);
      setIsReviewsLoading(false);
    });
  }
  useEffect(() => {
    getReviews();
  }, []);
  return (
    <div>
      <Title>Reviews</Title>
      <ColWrapper>
        <div>
          <WhiteBox>
            <SubTitle>Add a review</SubTitle>
            <div>
              <StarsRating onChange={setStars} />
            </div>
            <Input
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextArea
              placeholder="Drop a quick comment on the product"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></TextArea>
            <div>
              <Buttons type="submit" primary onClick={submitReview}>
                Submit your review
              </Buttons>
            </div>
          </WhiteBox>
        </div>
        {/* all products review */}
        <div>
          <WhiteBox>
            <SubTitle>All reviews</SubTitle>
            {isReviewsLoading && <Spinner fullWidth={true} />}
            {
              // if we have no reviews, show this message.
              reviews.length === 0 && <p>Sorry! No review for this product.</p>
            }
            {reviews.length > 0 &&
              reviews.map((review) => (
                <ReviewsWrapper key={review._id}>
                  <ReviewsHeader>
                    <StarsRating
                      size={"sm"}
                      defaultRating={review.stars}
                      disabled={true}
                    />
                    <time>{dateFormatter(review.createdAt)}</time>
                  </ReviewsHeader>
                  <h3>{review.title}</h3>
                  <p>{review.description}</p>
                </ReviewsWrapper>
              ))}
          </WhiteBox>
        </div>
      </ColWrapper>
    </div>
  );
}
