<?php
/**
 * Debug Toolbar Element
 * Renders all of the other panel elements.
 * PHP 5
 * CakePHP(tm) : Rapid Development Framework (http://cakephp.org)
 * Copyright (c) Cake Software Foundation, Inc. (http://cakefoundation.org)
 * Licensed under The MIT License
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Cake Software Foundation, Inc. (http://cakefoundation.org)
 * @link          http://cakephp.org CakePHP(tm) Project
 * @since         DebugKit 0.1
 * @license       http://www.opensource.org/licenses/mit-license.php MIT License
 */
?>
<div class="debugkit-theme-default">
    <div id="debug-kit-toolbar">
        <?php
        if (empty($debugToolbarPanels)) {
            echo $this->Html->tag('p', __d('debug_kit', 'There are no active panels. You must enable a panel to see its output.'), ['class' => 'warning']);
        } else {
            ?>
            <ul id="panel-tabs">
                <li class="panel-tab icon">
                    <a href="#hide" id="hide-toolbar">
                        <?php echo $this->Html->image('/debug_kit/img/cake.icon.svg', ['alt' => 'CakePHP']); ?>
                    </a>
                </li>
                <?php
                foreach ($debugToolbarPanels as $panelName => $panelInfo) {
                    $panelUnderscore = Inflector::underscore($panelName);
                    $title = (empty($panelInfo['title'])) ? Inflector::humanize($panelUnderscore) : $panelInfo['title'];
                    ?>
                    <li class="panel-tab">
                        <?php
                        echo $this->Toolbar->panelStart($title, $panelUnderscore);
                        ?>
                        <div class="panel-content" id="<?=$panelUnderscore?>-tab">
                            <div class="panel-content-data">
                                <?php
                                echo $this->element($panelInfo['elementName'], $panelInfo, [
                                    'plugin' => (empty($panelInfo['plugin'])) ? null : Inflector::camelize($panelInfo['plugin']),
                                ]);
                                ?>
                            </div>
                            <div class="panel-resizer"></div>
                        </div>
                        <?php
                        $this->Toolbar->panelEnd();
                        ?>
                    </li>
                    <?php
                }
                ?>
            </ul>
            <?php
        }
        ?>
    </div>
</div>
