const myTheme = {
  token: {
    fontFamily: 'var(--font-main), -apple-system, BlinkMacSystemFont, sans-serif',
    colorText: 'var(--gray-900-tit)',
    colorTextPlaceholder: 'var(--gray-600)',
    colorTextQuaternary: 'var(--gray-600)',
    colorBgContainerDisabled: 'var(--gray-200-bg)',
    colorBorder: 'var(--gray-300-border)',
  },

  components: {
    Form: {
      labelColor: 'var(--gray-800-body)',
      labelFontSize: 14,
      labelRequiredMarkColor: '#FF1D43',
    },

    Input: {
      controlHeight: 36,
      borderRadius: 100,
      fontSize: 14,
      activeShadow: '0',
      paddingInline: 12,

      controlHeightLG: 60,
      borderRadiusLG: 15,
      fontSizeLG: 20,
      paddingInlineLG: 20,
    },

    Button: {
      colorPrimary: 'var(--blue-700-main)',
      colorPrimaryHover: 'var(--blue-700-main)',
      colorPrimaryActive: 'var(--blue-700-main)',
      colorTextLightSolid: 'var(--white)',

      defaultBg: 'var(--gray-600)',
      defaultColor: 'var(--white)',
      defaultHoverBg: 'var(--gray-600)',
      defaultHoverColor: 'var(--white)',
      defaultActiveColor: 'var(--white)',
      defaultActiveBg: 'var(--gray-600)',
      defaultHoverBorderColor: 'var(--gray-600)',
      defaultActiveBorderColor: 'var(--gray-600)',

      borderRadius: 100,
      fontWeight: 500,
      contentFontSize: 16,
      controlHeight: 45,

      borderRadiusSM: 100,
      contentFontSizeSM: 14,
      controlHeightSM: 36,
      paddingInlineSM: 16,
    },

    Select: {
      controlHeight: 36,
      borderRadius: 100,
      fontSize: 14,
      paddingInline: 12,
      colorText: 'var(--gray-800-body)',

      controlHeightSM: 40,
      borderRadiusSM: 10,
      fontSizeSM: 16,

      controlHeightLG: 60,
      borderRadiusLG: 15,
      fontSizeLG: 16,
    },

    DatePicker: {
      borderRadius: 6,
      inputFontSize: 14,
      colorTextPlaceholder: 'var(--green-txt-body)',
      controlHeight: 36,
    },

    Menu: {
      colorPrimary: 'var(--gray-900-tit)',
      colorBgContainer: 'transparent',
      colorText: 'var(--gray-600)',
      itemActiveBg: 'transparent',
      itemSelectedBg: 'transparent',
      itemHoverBg: 'transparent',
      subMenuItemBg: 'transparent',
      itemHeight: 36,
      fontSize: 14,
    },

    Modal: {
      borderRadius: 20,
      padding: 40,
      titleFontSize: 24,
      titleColor: 'var(--gray-900)',
    },

    Table: {
      headerBg: 'var(--gray-300-border)',
      headerColor: 'var(--gray-700)',
      cellFontSize: 14,
      headerBorderRadius: 6,
      borderColor: 'var(--gray-300-border)',
      cellPaddingBlock: 13,
      stickyScrollBarBorderRadius: 500,
    },

    Checkbox: {
      colorPrimary: 'var(--blue-700-main)',
      colorPrimaryHover: 'var(--blue-700-main)',
      borderRadius: 10,
    },

    Radio: {
      radioSize: 18,
      dotSize: 10,
    },

    Switch: {
      colorTextQuaternary: 'var(--gray)',
      colorPrimary: 'var(--main-blue-1)',
      colorPrimaryHover: 'var(--main-blue-1)',
    },

    Pagination: {
      borderRadius: 4,
      itemSize: 24,
      fontSize: 14,
      colorText: 'var(--gray-700)',
      colorBgContainer: 'transparent',
      colorBgTextHover: 'transparent',
      itemBorderColor: 'transparent',
      itemActiveBg: 'var(--gray-800-body)',
      itemActiveColor: 'var(--white)',
    },

    Card: {
      headerHeight: 60,
      headerPadding: 20,
      bodyPadding: 20,
      headerBg: 'var(--bg-gray)',
    },

    Notification: {
      width: 400,
    },
  },
};

export default myTheme;
