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
            this._bindResize();
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

        /**
         *
         * @private
         */
        _bindResize() {

            Util.iterate(this.panelTabs, (panelTab) => {

                let startY, startHeight;


                let panelContent = panelTab.parentElement.querySelector('.panel-content');
                let resizer = panelTab.parentElement.querySelector('.panel-resizer');

                resizer.addEventListener('mousedown', initDrag, false);

                function initDrag(e) {
                    startY = e.clientY;
                    startHeight = parseInt(document.defaultView.getComputedStyle(panelContent).height, 10);
                    document.documentElement.addEventListener('mousemove', doDrag, false);
                    document.documentElement.addEventListener('mouseup', stopDrag, false);
                }

                function doDrag(e) {

                    let bodyRect = document.body.getBoundingClientRect(),
                        elemRect = panelContent.getBoundingClientRect(),
                        offset = elemRect.top - bodyRect.top;

                    // Get the viewport height
                    let viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

                    let newHeight = (startHeight + e.clientY - startY);

                    // Make sure we dont go over the viewport
                    if ((newHeight + (offset * 2)) > viewportHeight) {
                        newHeight = viewportHeight - (offset * 2);
                    }

                    panelContent.style.height = `${newHeight}px`;
                }

                function stopDrag(e) {
                    document.documentElement.removeEventListener('mousemove', doDrag, false);
                    document.documentElement.removeEventListener('mouseup', stopDrag, false);
                }
            });


        }

        _startResize(e) {

        }

        _hideAllPanels() {
            Util.iterate(this.panelTabs, (panelTab) => {
                panelTab.parentElement.classList.remove('opened');
            });
        }

    }

    return new DebugKit;
})();
