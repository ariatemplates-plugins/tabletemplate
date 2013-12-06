/*
 * Copyright 2012 Amadeus s.a.s.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

Aria.classDefinition({
    $classpath : "test.atplugins.tabletemplate.FilteringTableTest",
    $extends : "aria.jsunit.TemplateTestCase",
    $dependencies : ["aria.utils.Dom"],
    $constructor : function () {
        this.$TemplateTestCase.constructor.call(this);
        this.domUtil = aria.utils.Dom;
        this.target = null;
    },
    $destructor : function () {
        this.domUtil = null;
        this.target = null;
        this.$TemplateTestCase.$destructor.call(this);
    },
    $prototype : {
        /**
         * Start the template test suite .
         */
        runTemplateTest : function () {
            this._getNeededElements();
            this.assertEquals(6, this.tableEntries.length);
            this.synEvent.click(this.filterAll, {fn : "_filterAllClicked", scope : this});
        },
        _filterAllClicked : function() {
            this._getNeededElements();
            this.assertEquals(0, this.tableEntries.length);
            this.synEvent.click(this.filterNone, {fn : "_filterNoneClicked", scope : this});
        },
        _filterNoneClicked : function() {
            this._getNeededElements();
            this.assertEquals(6, this.tableEntries.length);
            this.synEvent.click(this.filterIum, {fn : "_filterIumClicked", scope : this});
        },
        _filterIumClicked : function() {
            this._getNeededElements();
            this.assertEquals(3, this.tableEntries.length);
            this._endTests();
        },
        /**
         * Wrapper to end the tests.
         */
        _endTests : function () {
            this.end();
        },
        _getNeededElements : function() {
            this.filterDiv = this.domUtil.getElementById("target").getElementsByClassName("filters")[0];
            this.tableEntries = this.domUtil.getElementById("testTable").children[1].children;
            this.filterNone = this.filterDiv.children[0].children[0];
            this.filterAll = this.filterDiv.children[1].children[0];
            this.filterIum = this.filterDiv.children[2].children[0];
        }
    }
});