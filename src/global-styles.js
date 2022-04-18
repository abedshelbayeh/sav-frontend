import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.BG200};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .disable-transition {
    * {
      transition: none !important;
    }
  }

  h2 {
    color: ${({ theme }) => theme.TEXT_PRIMARY};
  }

  .ant-dropdown-menu {
    background-color: ${({ theme }) => theme.BG_FLOAT};
    border-radius: 2px;
  }

  .ant-dropdown-menu-item {
    color: ${({ theme }) => theme.TEXT_PRIMARY};

    :hover {
      background-color: ${({ theme }) => theme.BG_FLOAT_HOVER};
    }
  }

  .ant-input-affix-wrapper {
    background-color: ${({ theme }) => theme.BG_INPUT} !important;
    border-color: ${({ theme }) => theme.BORDER};
    color: ${({ theme }) => theme.TEXT_PRIMARY};
    border-radius: 2px;
    box-shadow: none !important;
  }

  .ant-input {
    background-color: ${({ theme }) => theme.BG_INPUT} !important;
    color: ${({ theme }) => theme.TEXT_PRIMARY};
    border-radius: 2px;
    box-shadow: none !important;
    border: ${({ theme }) => `1px solid ${theme.BORDER}`}; !important;

    &:hover, &:focus {
      border-color: ${({ theme }) => theme.primaryColor} !important;
    }
  }

  .ant-input-group-addon {
    background-color: unset !important;
  }

  .ant-input-search-button {
    background-color: ${({ theme }) => theme.BG_INPUT} !important;
    color: ${({ theme }) => theme.TEXT_PRIMARY};
    border-radius: 0 2px 2px 0px !important;
    border: ${({ theme }) => `1px solid ${theme.BORDER}`} !important;
    
    :hover, :focus {
      border: ${({ theme }) => `1px solid ${theme.primaryColor}`} !important;
    }
  }

  .ant-btn {
    border-radius: 2px;
  }

  .ant-btn-default {
    background-color:inherit;
    border-color: ${({ theme }) => theme.BORDER} !important;
    color: ${({ theme }) => theme.TEXT_PRIMARY} !important;

    :hover {
      background-color: ${({ theme }) => theme.BG_TRANSPARENT_OVERLAY};
    }
  }

  .ant-table {
    box-shadow: 0 2px 1px -1px rgb(0 0 0 / 20%), 0 1px 1px 0 rgb(0 0 0 / 14%), 0 1px 3px 0 rgb(0 0 0 / 12%);
    border-radius: 2px !important;
    overflow: hidden;
    background: transparent;

    tbody > tr:hover > td {
      background-color: ${({ theme }) =>
        theme.BG_TRANSPARENT_OVERLAY_BRIGHT} !important;
    }
  }

  .ant-table-tbody :last-child > .ant-table-cell {
    border: none;
  }

  .ant-table-cell {
    background-color: ${({ theme }) => theme.BG100} !important;
    border-color: ${({ theme }) => theme.BG_TRANSPARENT_OVERLAY} !important;
    color: ${({ theme }) => theme.TEXT_PRIMARY} !important;
  }

  .ant-pagination-item {
    background-color: ${({ theme }) => theme.BG100};
    border-radius: 2px !important;

    a {
      color: ${({ theme }) => theme.TEXT_PRIMARY};
    }
  }

  .ant-select-selector {
    background-color: ${({ theme }) => theme.BG_FLOAT} !important;
    color: ${({ theme }) => theme.TEXT_PRIMARY};
    border-radius: 2px !important;
    border: ${({ theme }) => `1px solid ${theme.BORDER}`} !important;

    :hover {
      border: ${({ theme }) => `1px solid ${theme.primaryColor}`} !important;
    }
  }

  .ant-select-focused:not(.ant-select-disabled).ant-select:not(.ant-select-customize-input)
    .ant-select-selector {
    border: ${({ theme }) => `1px solid ${theme.primaryColor}`} !important;
  }

  .ant-select-arrow {
    color: ${({ theme }) => theme.TEXT_PRIMARY};
  }

  .ant-pagination-item-link {
    color: ${({ theme }) => theme.primaryColor} !important;
  }

  .ant-pagination-item-ellipsis {
    color: ${({ theme }) => theme.TEXT_PRIMARY} !important;
  }

  .ant-spin-blur {
    ::after {
      display: none;
    }
  }

  .ant-select-dropdown {
    background-color: ${({ theme }) => theme.BG_FLOAT};
    border-radius: 2px;
    overflow: hidden;
  }

  .ant-select-item {
    background-color: ${({ theme }) => theme.BG_FLOAT} !important;
    color: ${({ theme }) => theme.TEXT_PRIMARY} !important;

    :hover {
      background-color: ${({ theme }) => theme.BG_FLOAT_HOVER} !important;
    }
  }

  .ant-modal-content {
    background-color: ${({ theme }) => theme.BG100} !important;
    border-radius: 2px;
    overflow: hidden;
  }

  .ant-modal-header {
    background-color: ${({ theme }) => theme.BG100};
  }

  .ant-modal-title {
    color: ${({ theme }) => theme.TEXT_PRIMARY};
  }

  .ant-modal-close-x {
    color: ${({ theme }) => theme.TEXT_PRIMARY};
  }

  .ant-modal-confirm-title {
    color: ${({ theme }) => theme.TEXT_PRIMARY} !important;
  }

  .ant-modal-confirm-content {
    color: ${({ theme }) => theme.TEXT_PRIMARY} !important;
  }

  .ant-mentions-dropdown {
    background-color: ${({ theme }) => theme.BG_FLOAT};
    border-radius: 2px;
  }

  .ant-mentions-dropdown-menu {
    background-color: ${({ theme }) => theme.BG_FLOAT};
    border-radius: 2px;
  }

  .ant-mentions-dropdown-menu-item {
    color: ${({ theme }) => theme.TEXT_PRIMARY};

    :hover {
      background-color: ${({ theme }) => theme.BG_FLOAT_HOVER};
    }
  }

  .ant-mentions-dropdown-menu-item-active {
    background-color: ${({ theme }) => theme.BG_FLOAT_HOVER};
  }

  .ant-empty-description {
    color: ${({ theme }) => theme.TEXT_SECONDARY};
  }

  .ant-mentions {
    background-color: ${({ theme }) => theme.BG_INPUT} !important;
    border-color: ${({ theme }) => theme.BORDER};
    border-radius: 2px;
    color: ${({ theme }) => theme.TEXT_PRIMARY} !important;
    overflow: hidden;

    &.ant-mentions-focused {
      border-color: ${({ theme }) => theme.primaryColor};
    }
  }

  .ant-mentions > textarea {
    background-color: ${({ theme }) => theme.BG_INPUT} !important;
    color: ${({ theme }) => theme.TEXT_PRIMARY} !important;
  }

  .ant-steps-item-process
    > .ant-steps-item-container
    > .ant-steps-item-tail::after {
    background-color: ${({ theme }) => theme.BG400} !important;
  }

  .ant-steps-item-finish
    > .ant-steps-item-container
    > .ant-steps-item-tail::after {
    background-color: ${({ theme }) => theme.primaryColor} !important;
  }

  .ant-steps-item-title {
    color: ${({ theme }) => theme.TEXT_PRIMARY} !important;
  }

  .ant-steps-item-description {
    color: ${({ theme }) => theme.TEXT_SECONDARY} !important;
  }

  .ant-steps-item-wait
    .ant-steps-item-icon
    > .ant-steps-icon
    .ant-steps-icon-dot {
    background: ${({ theme }) => theme.BG400};
  }

  .ant-result-title {
    color: ${({ theme }) => theme.TEXT_PRIMARY} !important;
  }

  .ant-result-subtitle {
    color: ${({ theme }) => theme.TEXT_SECONDARY} !important;
  }

  .ant-result-info {
    color: ${({ theme }) => theme.primaryColor} !important;
  }

  .ant-switch-inner {
    display: flex;
    align-items: center;
  }

  .ant-empty-img-simple {
    opacity: ${({ theme }) => theme.EMPTY_IMAGE_OPACITY};
  }

  .ant-typography {
    color: ${({ theme }) => theme.TEXT_PRIMARY} !important;
  }

  .ant-btn-circle {
    border-radius: 50% !important;
    outline: ${({ theme }) => theme.primaryColor} !important;
  }

  .ant-notification-notice {
    background-color: ${({ theme }) => theme.BG_NOTIFICATION} !important;
    border-radius: 2px;
    color: ${({ theme }) => theme.TEXT_PRIMARY};
  }

  .ant-notification-notice-message {
    color: ${({ theme }) => theme.TEXT_PRIMARY};
  }

  .ant-notification-notice-close-x {
    color: ${({ theme }) => theme.TEXT_SECONDARY};
  }

  .ant-alert-info {
    background-color: transparent;
    border: ${({ theme }) => `0.5px solid ${theme.primaryColor}`};
    border-left: ${({ theme }) => `3px solid ${theme.primaryColor}`};
    border-radius: 2px;
    padding-left: 10px; 
    margin: 5px 0;
    
    & .ant-alert-message {
      color: ${({ theme }) => theme.TEXT_PRIMARY};
      font-weight: 600;
    }

    & .anticon {
      color: ${({ theme }) => theme.primaryColor};
    }
  }
`;

export default GlobalStyle;
