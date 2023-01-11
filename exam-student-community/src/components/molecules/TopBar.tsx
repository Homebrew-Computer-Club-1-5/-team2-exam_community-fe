import { Bar, Search } from "./small/styled";
import { IconBar, IconSearch } from "./small/icons";
import { Link } from "react-router-dom";

interface ITopBarProps {
  isLoggedIn: Boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<Boolean>>;

  toggle: VoidFunction;
}

function TopBar({ isLoggedIn, setIsLoggedIn, toggle }: ITopBarProps) {
  const onClickLogOut = () => {
    const isLoggedInPromise = new Promise((resolve, reject) => {
      resolve(isLoggedIn);
    });

    isLoggedInPromise
      .then((value) => !value)
      .then((value) => {
        setIsLoggedIn(value);
        localStorage.setItem("isLoggedIn", JSON.stringify(value));
        return value;
      })
      .then((value) => console.log(value));
  };
  return (
    <Bar>
      <div className="top">
        <span onClick={toggle}>
          <IconBar />
        </span>
        <span className="logo">
          <Link to="/">서비스명</Link>
        </span>
        {isLoggedIn ? (
          <span onClick={onClickLogOut}>
            <Link to="/">로그아웃</Link>
          </span>
        ) : (
          <span>
            <Link to="/login">로그인</Link>
          </span>
        )}
      </div>
      <Search>
        <input placeholder="검색어를 입력하세요" />
        <button>
          <IconSearch />
        </button>
      </Search>
    </Bar>
  );
}

export default TopBar;
