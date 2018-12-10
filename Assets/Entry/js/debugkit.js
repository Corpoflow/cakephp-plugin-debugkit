import Util from '../../Modules/Util';

/**
 *
 * @type {DebugKit}
 */
window.DEBUGKIT = (function () {

    /**
     *
     */
    class DebugKit {

        /**
         *
         */
        constructor() {
            document.addEventListener('DOMContentLoaded', () => {
                this.DOMReady();
            });

        }

        /**
         *
         * @constructor
         */
        DOMReady() {
            this.toolbarElement = document.querySelector('#debug-kit-toolbar');
            this.panelTabs = document.querySelectorAll('#debug-kit-toolbar .panel-tab:not(.icon) > a');
            this.nextLevelNeatArrays = document.querySelectorAll('#debug-kit-toolbar .neat-array li.has-next-level');

            this._bindShowHidebutton();
            this._bindShowHidePanels();
            this._bindNeatArrayExpansion();
        }

        /**
         *
         * @private
         */
        _bindShowHidebutton() {
            document.querySelector('#hide-toolbar').addEventListener('click', (e) => {
                e.preventDefault();
                this.toolbarElement.classList.toggle('visible');
                this._hideAllPanels();
            });
        }

        /**
         *
         * @private
         */
        _bindShowHidePanels() {
            Util.iterate(this.panelTabs, (panelTab) => {
                panelTab.addEventListener('click', (e) => {
                    e.preventDefault();
                    if (panelTab !== e.target) return;

                    let wasOpened = panelTab.parentElement.classList.contains('opened');

                    this._hideAllPanels();

                    if (!wasOpened) {
                        panelTab.parentElement.classList.add('opened');
                    }
                });
            });
        }

        /**
         *
         * @private
         */
        _bindNeatArrayExpansion() {
            Util.iterate(this.nextLevelNeatArrays, (nextLevelNeatArrayLi) => {
                nextLevelNeatArrayLi.addEventListener('click', (e) => {
                    e.preventDefault();
                    let currentStrong = nextLevelNeatArrayLi.querySelector('strong');
                    if (nextLevelNeatArrayLi !== e.target && currentStrong !== e.target) return;
                    nextLevelNeatArrayLi.classList.toggle('next-level-open');
                });
            });
        }

        _hideAllPanels() {
            Util.iterate(this.panelTabs, (panelTab) => {
                panelTab.parentElement.classList.remove('opened');
            });
        }

    }

    return new DebugKit;
})();
