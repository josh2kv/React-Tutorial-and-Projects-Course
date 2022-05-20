import React from 'react'
import styled from 'styled-components'
const Footer = () => {
  return (
    <Wrapper>
      <h5>
        &copy; {new Date().getFullYear()}
        <span>ComfySloth</span>
      </h5>
      <h5>All rights reserved</h5>
    </Wrapper>
  )
}

const Wrapper = styled.footer`
  height: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: var(--clr-black);
  text-align: center;
  span {
    color: var(--clr-primary-5);
    margin: 0 0.2rem 0 0.4rem;
  }
  h5 {
    color: var(--clr-white);
    margin: 0.1rem 0.2rem;

    font-weight: 400;
    text-transform: none;
    line-height: 1.25;
  }
  @media (min-width: 776px) {
    flex-direction: row;
  }
`

export default Footer
