// import { useEffect, useState } from "react";
// import { useLocation, useNavigate, useParams } from "react-router-dom";
// import TopBar from "../molecules/TopBar";
// import PostsList from "../molecules/PostsList";
// import axios from "axios";
// import { getPosts, SERVER_URL } from "../../api";
// import {
//   BoardName,
//   BoardOption,
//   BoardOptions,
//   Wrapper,
// } from "../molecules/atoms/styled";
// import { BoardsObject } from "../molecules/atoms/sampleData";
// import Loading from "../molecules/Loading";

// function Posts() {
//   const [postsData, setPostsData] = useState();
//   const [boardIdState, setBoardIdState] = useState(2);
//   const [boardNameState, setBoardNameState] = useState("정보게시판");
//   const [changeBoardLoading, setChangeBoardLoading] = useState(false);

//   useEffect(() => {
//     setChangeBoardLoading(true);
//     const paintPosts = async () => {
//       const response = await getPosts(boardIdState);
//       setPostsData(response[0]);
//       setChangeBoardLoading(false);
//     };
//     paintPosts();
//     console.log("boardId : ", boardIdState);
//     console.log("boardName : ", boardNameState);
//   }, [boardIdState]);

//   return (
//     <Wrapper>
//       <TopBar needWrite={true} needSearch={true} />
//       <BoardOptions>
//         {Object.keys(BoardsObject).map((key, index) => (
//           <BoardOption
//             key={key}
//             onClick={() => {
//               setBoardIdState(parseInt(key));
//               setBoardNameState(BoardsObject[key]);
//             }}
//           >
//             {BoardsObject[key]}
//           </BoardOption>
//         ))}
//       </BoardOptions>
//       <BoardName>{boardNameState}</BoardName>
//       {changeBoardLoading ? (
//         <Loading />
//       ) : (
//         <PostsList
//           id={boardIdState}
//           name={boardNameState}
//           postsData={postsData}
//         />
//       )}
//     </Wrapper>
//   );
// }
// export default Posts;

import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import TopBar from "../molecules/TopBar";
import PostsList from "../molecules/PostsList";
import axios from "axios";
import { getPosts, SERVER_URL } from "../../api";
import {
  BoardName,
  BoardOption,
  BoardOptions,
  Wrapper,
} from "../molecules/atoms/styled";
import { BoardsObject } from "../molecules/atoms/sampleData";
import Loading from "../molecules/Loading";

export interface IPostsState {
  state: {
    boardId: number;
    boardName: string;
  } | null;
}

const defaultBoard = { boardName: "정보게시판", boardId: 2 };

function Posts() {
  let { state } = useLocation() as IPostsState;

  const [postsData, setPostsData] = useState();
  const [boardNameState, setBoardNameState] = useState("정보게시판");
  const [boardIdState, setBoardIdState] = useState(2);
  const [changeBoardLoading, setChangeBoardLoading] = useState(false);

  useEffect(() => {
    setChangeBoardLoading(true);
    const paintPosts = async () => {
      if (state === null) {
        const response = await getPosts(2);
        setBoardNameState("정보게시판");
        setBoardIdState(2);
        setPostsData(response[0]);
        setChangeBoardLoading(false);
      } else {
        const response = await getPosts(state?.boardId as any);
        setBoardNameState(state?.boardName as any);
        setBoardIdState(state?.boardId as any);
        setPostsData(response[0]);
        setChangeBoardLoading(false);
      }
    };
    paintPosts();
  }, [state]);

  return (
    <Wrapper>
      <TopBar needWrite={true} needSearch={true} />
      <BoardOptions>
        {Object.keys(BoardsObject).map((key, index) => (
          <Link
            key={key}
            to="/posts"
            state={{
              boardId: parseInt(key),
              boardName: BoardsObject[key],
            }}
          >
            <BoardOption>{BoardsObject[key]}</BoardOption>
          </Link>
        ))}
      </BoardOptions>

      {changeBoardLoading ? (
        <Loading />
      ) : (
        <>
          <BoardName>{boardNameState}</BoardName>
          <PostsList
            id={state?.boardId}
            name={state?.boardName}
            postsData={postsData}
          />
        </>
      )}
    </Wrapper>
  );
}
export default Posts;
