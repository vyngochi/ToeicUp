import styled from 'styled-components'

export const HeaderWrapper = styled.div<{ scrolled: boolean }>`
  position: fixed;
  z-index: 100;
  padding: 10px 30px 10px 30px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: ${(props) => (!props.scrolled ? '1px solid var(--color-gray-200)' : 'none')};
`
