import styled from "@emotion/styled";

// Wrap the overlay around the Modal object

export const Overlay = styled.div`
  position: fixed;
  background: rgba(0,0,0,0.5);
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  text-align: center;
  padding-top: 64px;
  z-index: 10;
`

export const Modal = styled.div`
  background: #fff;
  border-radius: 5px;
  width: 100%;
  max-width: 640px;
  border: 2px solid #111;
  display: inline-block;
  padding: 10px;
`