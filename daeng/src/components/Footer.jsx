import { useState } from "react";
import styled from "styled-components";
import footerHome from "../assets/icons/footer_home.svg";
import footerHoverHome from "../assets/icons/footer_hover_home.svg";
import footerSearch from "../assets/icons/footer_search.svg";
import footerHoverSearch from "../assets/icons/footer_hover_search.svg";
import footerBookmark from "../assets/icons/footer_bookmark.svg";
import footerHoverBookmark from "../assets/icons/footer_hover_bookmark.svg";
import footerVisiting from "../assets/icons/footer_visiting.svg";
import footerHoverVisiting from "../assets/icons/footer_hover_visiting.svg";
import footerMypage from "../assets/icons/footer_mypage.svg";
import footerHoverMypage from "../assets/icons/footer_hover_mypage.svg";

const FooterContainer = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 554px;
    height: 77px;
    background-color: #ffffff;
`;

const FooterItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    img {
        width: 24px;
        height: 24px;
    }

    span {
        margin-top: 4px;
        font-size: 12px;
        font-weight: bold;
        color: #d9d9d9; 
    }

    &:hover span {
        color: #ff4b98; 
    }
`;

const Footer = () => {
    const items = [
        { icon: footerHome, hoverIcon: footerHoverHome, label: "홈" },
        { icon: footerSearch, hoverIcon: footerHoverSearch, label: "검색" },
        { icon: footerBookmark, hoverIcon: footerHoverBookmark, label: "즐겨찾기" },
        { icon: footerVisiting, hoverIcon: footerHoverVisiting, label: "방문 일정" },
        { icon: footerMypage, hoverIcon: footerHoverMypage, label: "마이페이지" },
    ];

    const [hoveredIndex, setHoveredIndex] = useState(null);

    return (
        <FooterContainer>
        {items.map((item, index) => (
            <FooterItem
            key={index}
            onMouseEnter={() => setHoveredIndex(index)} 
            onMouseLeave={() => setHoveredIndex(null)} 
            >
            <img
                src={hoveredIndex === index ? item.hoverIcon : item.icon} // Hover 상태에 따라 아이콘 변경
                alt={item.label}
            />
            <span>{item.label}</span>
            </FooterItem>
        ))}
        </FooterContainer>
    );
};

export default Footer;
