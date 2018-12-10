<?php
/**
 * SQL Log Panel Element
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

$headers = ['Query', 'Affected', 'Num. rows', 'Took (ms)', 'Actions'];

echo $this->Html->tag('h2', __d('debug_kit', 'Sql Logs'));

if (empty($content)) {
    echo $this->Toolbar->message('Warning', __d('debug_kit', 'No active database connections'));
} else {
    foreach ($content['connections'] as $dbName => $explain) {
        ?>
        <div class="sql-log-panel-query-log">
            <?php
            echo $this->Html->tag('h4', $dbName);

            $queryLog = $this->Toolbar->getQueryLogs($dbName, [
                'explain' => $explain, 'threshold' => $content['threshold'],
            ]);
            if (empty($queryLog['queries'])) {
                if (Configure::read('debug') < 2) {
                    echo ' ' . __d('debug_kit', 'No query logs when debug < 2.');
                } else {
                    echo ' ' . __d('debug_kit', 'No query logs.');
                };
            } else {
                $hashes = [];
                $duplicate = 0;
                foreach ($queryLog['queries'] as $key => $val) {
                    $hash = sha1($val['query']);
                    if ( ! isset($hashes[$hash]) || $hashes[$hash] !== $val['affected']) {
                        $hashes[$hash] = $val['affected'];
                        continue;
                    }
                    $duplicate++;

                    $queryLog['queries'][$key]['query'] = '<span class="alert-duplicate">' . $val['query'] . '</span>';
                }

                echo $this->Html->tag('h5', __d('debug_kit', 'Total Time: %s ms <br />Total Queries: %s queries', $queryLog['time'], $queryLog['count']));
                echo $this->Toolbar->table($queryLog['queries'], $headers, ['title' => 'SQL Log ' . $dbName]);
                if ($duplicate) {
                    echo $this->Html->tag('p', __d('debug_kit', '%s duplicate queries run.', $duplicate), ['class' => 'alert alert-warning']);
                }
                echo $this->Html->tag('h4', __d('debug_kit', 'Query Explain:'));
                ?>
                <div id="sql-log-explain-<?=$dbName?>">
                    <a id="debug-kit-explain-<?=$dbName?>"> </a>
                    <p><?php echo __d('debug_kit', 'Click an "Explain" link above, to see the query explanation.'); ?></p>
                </div>
            <?php }; ?>
        </div>
        <?php
    }
}
