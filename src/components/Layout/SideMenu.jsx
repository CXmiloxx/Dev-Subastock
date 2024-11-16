import useOptions from "./hooks/useOptions";
import { Link } from "react-router-dom";
import useAuth from "../../contexts/AuthContext";

const SideMenu = ({ onOptionClick }) => {
  const options = useOptions();
  const { logout } = useAuth();

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <ul
        style={{
          padding: 0,
          margin: 0,
        }}
      >
        {options.map((option, index) => {
          return option.linksTo ? (
            <li
              key={index}
              style={{
                listStyle: "none",
              }}
            >
              <Link
                to={option.linksTo}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "15px 30px",
                  color: "var(--text-color)",
                  textDecoration: "none",
                  fontSize: "1.3rem",
                  gap: 15,
                  borderBottom: "0.1px solid #00000050",
                }}
              >
                {option.icon({
                  width: 34,
                  height: 34,
                  fill: "var(--primary-color)",
                })}
                <span>{option.name}</span>
              </Link>
            </li>
          ) : (
            <li
              key={index}
              style={{
                listStyle: "none",
              }}
            >
              <div
                onClick={logout}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "15px 30px",
                  color: "var(--text-color)",
                  textDecoration: "none",
                  fontSize: "1.3rem",
                  cursor: "pointer",
                  gap: 15,
                  borderBottom: "0.1px solid #00000050",
                }}
              >
                {option.icon({
                  width: 34,
                  height: 34,
                  fill: "var(--primary-color)",
                })}
                <span>{option.name}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SideMenu;
