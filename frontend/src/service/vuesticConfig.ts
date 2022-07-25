/**
 * @author    Tobias Breitenauer <tobias.breitenauer@hs-augsburg.de>
 * @copyright 2022
 * @license   MIT
 * 
 * This file sets some global properties for Vuestic UI Components.
 */
const background = '#202020',
      primary = '#6d6dbc';

const vuesticConfig = { 
    config: {
       colors: {
        primary: primary,
        danger: '#f15a5a',
        "input-error-color": "#fa8e8e"
      },
      componentsAll: {
          color: background
      },
      components: {
        VaButton: {
            color: primary
        },
        VaButtonDropdown: {
            color: primary
        },
        VaProgressBar: {
          color: primary
        },
        VaSwitch: {
          color: primary
        },
        VaFileUpload: {
          color: primary
        }
      }
    }
 }

export default vuesticConfig;
