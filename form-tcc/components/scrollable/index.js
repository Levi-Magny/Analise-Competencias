import { useEffect, useState } from "react";
import styled from "styled-components";

const ScrollableBox = styled.div`
    display: flex;
    border-radius: 18px;
    flex-direction: column;
    min-height: 15rem;
    min-width: 10rem;
    background-color: #A283D4;
    overflow-y: overlay;
    box-shadow: inset 0px 0px 32px -10px;
    height: 50vh;
    max-width: 22rem;
    margin-right: 1.6rem;

    &::-webkit-scrollbar {
      width: 1rem;
      transition: 1s;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #f4f4f4;
      border-radius: 0 18px 18px 0;
      visibility: hidden;
      transition: 1s ease;
    }

    &:hover::-webkit-scrollbar-thumb {
      background-color: #f4f4f4;
      opacity: 1;
      visibility: visible;
    }

    &::-webkit-scrollbar-track {
      background-color: #C8B3E9;
      transition: 1s;
      border-radius: 0 18px 18px 0;
    }
  
  @media (max-width:750px) {
    display: none;
  }
`
const ComptItem = styled.div`
  border-bottom: solid 1px #9772d2;
  background-color: ${(props) => (props.$sel ? "#c8b3e9ff" : "#c8b3e966")};
  transition: .5s;

  :hover {
    background-color: #c8b3e9ff;
    cursor: pointer;
  }

  p {
    padding: 1rem;
    font-family: "Roboto", Helvetica, sans-serif;
    color: #554384;
  }
`;

const CompetenceItem = ({ children, idx, onclick, selected }) => {
  const [index, setIndex] = useState(null);

  useEffect(()=> {
    setIndex(idx);
  }, [])

  const updateindex = (value) => {
    onclick(value);
  }

  return (
    <ComptItem onClick={() => updateindex(index)} $sel={selected ? 1 : 0}>{children}</ComptItem>
  )
}

export {ScrollableBox, CompetenceItem};
