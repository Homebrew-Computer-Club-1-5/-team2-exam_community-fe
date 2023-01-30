import {
  Writer,
  Details,
  Content,
  ContentInfo,
  User,
  UserInfo,
  ContentBtn,
  ContentBtns,
  Content_Title,
  Content_Content,
} from "./atoms/styled";
import { samplePost } from "./atoms/sampleData";
import {
  IconLike,
  IconUser,
  IconCopy,
  IconCopied,
  IconLiked,
} from "./atoms/icons";
import { useState, useEffect } from "react";
import { IPostData } from "../pages/Post";
import Loading from "./Loading";
import { timeCalculator } from "../../api";
import { useRecoilValue } from "recoil";
import { userId } from "../../store/atoms";

interface IPostProp {
  post?: any | null;
  handleDelete: any;
  handleEdit: any;
}

function PostMainContents({ post, handleDelete, handleEdit }: IPostProp) {
  const [likeClicked, setLikeClicked] = useState(false);
  const [scrapClicked, setScrapClicked] = useState(false);
  const [likeNum, setLikeNum] = useState();
  const [scrapNum, setScrapNum] = useState();
  const loginUserId = useRecoilValue(userId);

  const onLike = () => {
    setLikeClicked((current) => !current);
  };
  const onCopy = () => {
    setScrapClicked((current) => !current);
  };

  useEffect(() => {
    console.log("post :", post);
    if (post) {
      setLikeNum(post.like_num);
    }
  }, []);

  return (
    <>
      <User height="5vh">
        <IconUser className="userIcon" />
        <UserInfo>
          <Writer>{post?.user_id}</Writer>
          <Details>{timeCalculator(post?.c_date)}</Details>
        </UserInfo>
        {post.user_id == loginUserId && (
          <div style={{ position: "absolute", right: 0 }}>
            <button onClick={handleEdit}>수정</button>
            <button onClick={handleDelete}>삭제</button>
          </div>
        )}
      </User>
      <Content>
        <Content_Title>{post?.title}</Content_Title>
        <Content_Content>{post?.content}</Content_Content>
      </Content>
      <ContentInfo>
        <ContentBtns>
          <ContentBtn onClick={onLike}>
            {likeClicked ? (
              <IconLiked className="icon" />
            ) : (
              <IconLike className="icon" />
            )}
            <span>좋아요</span>
          </ContentBtn>
          <ContentBtn onClick={onCopy}>
            {scrapClicked ? (
              <IconCopied className="icon" />
            ) : (
              <IconCopy className="icon" />
            )}
            <span>스크랩</span>
          </ContentBtn>
        </ContentBtns>
      </ContentInfo>
    </>
  );
}

export default PostMainContents;
