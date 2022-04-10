import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.BACKGROUND_300};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .disable-transition {
    * {
      transition: none !important;
    }
  }

  .ant-avatar {
    background-color: ${({ theme }) => theme.BACKGROUND_TRANSPARENT_OVERLAY};
    color: ${({ theme }) => theme.COLOR_PRIMARY_TEXT};
    border: ${({ theme }) =>
      `1px solid ${theme.BACKGROUND_TRANSPARENT_OVERLAY}`};
  }

  .ant-dropdown-menu {
    background-color: ${({ theme }) => theme.BACKGROUND_200};
    border: ${({ theme }) => `1px solid ${theme.COLOR_SOLID_BORDER}`};
  }

  .ant-dropdown-menu-item {
    color: ${({ theme }) => theme.COLOR_PRIMARY_TEXT};

    :hover {
      background-color: ${({ theme }) => theme.BACKGROUND_TRANSPARENT_OVERLAY};
    }
  }

  h2 {
    color: ${({ theme }) => theme.COLOR_PRIMARY_TEXT};
  }

  .ant-badge-count {
    background-color: ${({ theme }) => theme.BACKGROUND_50};
    box-shadow: none;
    color: ${({ theme }) => theme.COLOR_PRIMARY_TEXT};
    font-weight: 500;
  }

  .ant-input-affix-wrapper {
    background-color: ${({ theme }) => theme.BACKGROUND_100} !important;
    border-color: ${({ theme }) => theme.COLOR_SOLID_BORDER};
    color: ${({ theme }) => theme.COLOR_PRIMARY_TEXT};
    border-radius: 5px;
    box-shadow: none !important;
  }

  .ant-input {
    background-color: ${({ theme }) => theme.BACKGROUND_100} !important;
    border-color: ${({ theme }) => theme.COLOR_SOLID_BORDER};
    color: ${({ theme }) => theme.COLOR_PRIMARY_TEXT};
    border-radius: 5px;
    box-shadow: none !important;
  }

  .ant-input-group-addon {
    background-color: unset !important;
  }

  .ant-input-search-button {
    background-color: ${({ theme }) => theme.BACKGROUND_100} !important;
    border: ${({ theme }) =>
      `1px solid ${theme.COLOR_SOLID_BORDER}`} !important;
    border-radius: 0 5px 5px 0px !important;

    :hover {
      border: ${({ theme }) =>
        `1px solid ${theme.lighterPrimaryColor}`} !important;
    }

    :focus {
      border: ${({ theme }) =>
        `1px solid ${theme.lighterPrimaryColor}`} !important;
    }
  }

  .ant-btn {
    border-radius: 5px;
  }

  .ant-btn-default {
    background-color: ${({ theme }) => theme.BACKGROUND_50};
    border: unset;
    color: ${({ theme }) => theme.COLOR_PRIMARY_TEXT} !important;

    :hover {
      background-color: ${({ theme }) =>
        theme.BACKGROUND_TRANSPARENT_OVERLAY_BRIGHT};
      color: ${({ theme }) => theme.COLOR_PRIMARY_TEXT};
      border: unset;
    }
  }

  .ant-table {
    background-color: ${({ theme }) => theme.BACKGROUND_300} !important;
    border: 1px solid ${({ theme }) => theme.COLOR_SOLID_BORDER_BRIGHT};
    border-radius: 5px !important;
    overflow: hidden;

    tbody > tr:hover > td {
      background-color: ${({ theme }) =>
        theme.BACKGROUND_TRANSPARENT_OVERLAY_BRIGHT} !important;
    }
  }

  .ant-table-thead {
    .ant-table-cell {
      background-color: ${({ theme }) =>
        theme.BACKGROUND_TRANSPARENT_OVERLAY_BRIGHT} !important;
    }
  }

  .ant-table-cell {
    background-color: ${({ theme }) => theme.BACKGROUND_200} !important;
    color: ${({ theme }) => theme.COLOR_PRIMARY_TEXT} !important;
    border-bottom: ${({ theme }) =>
      `1px solid ${theme.COLOR_SOLID_BORDER_BRIGHT}`} !important;
  }

  .ant-pagination-item {
    background-color: ${({ theme }) => theme.BACKGROUND_100};
    border-radius: 5px !important;

    a {
      color: ${({ theme }) => theme.COLOR_PRIMARY_TEXT};
    }
  }

  .ant-select-selector {
    background-color: ${({ theme }) => theme.BACKGROUND_100} !important;
    color: ${({ theme }) => theme.COLOR_PRIMARY_TEXT};
    border-radius: 5px !important;
    border: ${({ theme }) =>
      `1px solid ${theme.COLOR_SOLID_BORDER}`} !important;

    :hover {
      border: ${({ theme }) => `1px solid ${theme.primaryColor}`} !important;
    }
  }

  .ant-select-focused:not(.ant-select-disabled).ant-select:not(.ant-select-customize-input)
    .ant-select-selector {
    border: ${({ theme }) => `1px solid ${theme.primaryColor}`} !important;
  }

  .ant-select-arrow {
    color: ${({ theme }) => theme.COLOR_PRIMARY_TEXT};
  }

  .ant-pagination-item-link {
    color: ${({ theme }) => theme.primaryColor} !important;
  }

  .ant-pagination-item-ellipsis {
    color: ${({ theme }) => theme.COLOR_PRIMARY_TEXT} !important;
  }

  .ant-spin-blur {
    ::after {
      display: none;
    }
  }

  .ant-select-dropdown {
    background-color: ${({ theme }) => theme.BACKGROUND_200};
    border: ${({ theme }) => `1px solid ${theme.COLOR_SOLID_BORDER}`};
    border-radius: 5px;
    overflow: hidden;
  }

  .ant-select-item {
    background-color: ${({ theme }) => theme.BACKGROUND_200} !important;
    color: ${({ theme }) => theme.COLOR_PRIMARY_TEXT} !important;

    :hover {
      background-color: ${({ theme }) =>
        theme.BACKGROUND_TRANSPARENT_OVERLAY} !important;
    }
  }

  .ant-modal-content {
    background-color: ${({ theme }) => theme.BACKGROUND_200} !important;
    outline: ${({ theme }) => `1px solid ${theme.COLOR_SOLID_BORDER}`};
    border-radius: 10px;
    overflow: hidden;
  }

  .ant-modal-header {
    background-color: ${({ theme }) => theme.BACKGROUND_200};
  }

  .ant-modal-title {
    color: ${({ theme }) => theme.COLOR_PRIMARY_TEXT};
  }

  .ant-modal-close-x {
    color: ${({ theme }) => theme.COLOR_PRIMARY_TEXT};
  }

  .ant-modal-confirm-title {
    color: ${({ theme }) => theme.COLOR_PRIMARY_TEXT} !important;
  }

  .ant-modal-confirm-content {
    color: ${({ theme }) => theme.COLOR_PRIMARY_TEXT} !important;
  }

  .ant-mentions-dropdown {
    background-color: ${({ theme }) => theme.BACKGROUND_200};
    border-radius: 5px;
  }

  .ant-mentions-dropdown-menu {
    background-color: ${({ theme }) => theme.BACKGROUND_200};
    border: ${({ theme }) => `1px solid ${theme.COLOR_SOLID_BORDER}`};
    border-radius: 5px;
  }

  .ant-mentions-dropdown-menu-item {
    color: ${({ theme }) => theme.COLOR_PRIMARY_TEXT};

    :hover {
      background-color: ${({ theme }) => theme.BACKGROUND_TRANSPARENT_OVERLAY};
    }
  }

  .ant-mentions-dropdown-menu-item-active {
    background-color: ${({ theme }) => theme.BACKGROUND_TRANSPARENT_OVERLAY};
  }

  .ant-empty-description {
    color: ${({ theme }) => theme.COLOR_SECONDARY_TEXT};
  }

  .ant-mentions {
    background-color: ${({ theme }) => theme.BACKGROUND_100} !important;
    border-color: ${({ theme }) => theme.COLOR_SOLID_BORDER};
    border-radius: 5px;
    color: ${({ theme }) => theme.COLOR_PRIMARY_TEXT} !important;
    overflow: hidden;

    &.ant-mentions-focused {
      border-color: ${({ theme }) => theme.lighterPrimaryColor};
    }
  }

  .ant-mentions > textarea {
    background-color: ${({ theme }) => theme.BACKGROUND_100} !important;
    color: ${({ theme }) => theme.COLOR_PRIMARY_TEXT} !important;
  }

  .ant-steps-item-process
    > .ant-steps-item-container
    > .ant-steps-item-tail::after {
    background-color: ${({ theme }) =>
      theme.COLOR_TRANSPARENT_BORDER} !important;
  }

  .ant-steps-item-finish
    > .ant-steps-item-container
    > .ant-steps-item-tail::after {
    background-color: ${({ theme }) => theme.primaryColor} !important;
  }

  .ant-steps-item-title {
    color: ${({ theme }) => theme.COLOR_PRIMARY_TEXT} !important;
  }

  .ant-steps-item-description {
    color: ${({ theme }) => theme.COLOR_SECONDARY_TEXT} !important;
  }

  .ant-steps-item-wait
    .ant-steps-item-icon
    > .ant-steps-icon
    .ant-steps-icon-dot {
    background: ${({ theme }) => theme.BACKGROUND_50};
  }

  .ant-result-title {
    color: ${({ theme }) => theme.COLOR_PRIMARY_TEXT} !important;
  }

  .ant-result-subtitle {
    color: ${({ theme }) => theme.COLOR_SECONDARY_TEXT} !important;
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
    color: ${({ theme }) => theme.COLOR_PRIMARY_TEXT} !important;
  }

  .ant-btn-circle {
    border-radius: 50% !important;
  }

  .ant-notification-notice {
    background-color: ${({ theme }) =>
      theme.NOTIFICATION_BACKGROUND} !important;
    border-radius: 10px;
    outline: ${({ theme }) => `1px solid ${theme.COLOR_SOLID_BORDER_BRIGHT}`};
    color: ${({ theme }) => theme.COLOR_PRIMARY_TEXT};
  }

  .ant-notification-notice-message {
    color: ${({ theme }) => theme.COLOR_PRIMARY_TEXT};
  }

  .ant-notification-notice-close-x {
    color: ${({ theme }) => theme.COLOR_SECONDARY_TEXT};
  }
`;

export default GlobalStyle;
