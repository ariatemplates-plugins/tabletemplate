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

Aria.tplScriptDefinition({
    $classpath : "extending.ExtendedTableTemplateScript",
    $extends : "atplugins.tabletemplate.TableScript",
    $constructor : function () {
    },
    $destructor : function () {
    },
    $prototype : {
      toAttributeName : function (str) {
        return str.toLowerCase().split(' ').join('_');
      },
      applyFilter :  function (evt, col) {
          var config = this.cfg;
          var attrName = this.toAttributeName(col.name);
          
          this.itemsView.filterIn(this.itemsView.FILTER_SET, function(o) {
              return o.value[attrName].toString().toLowerCase().indexOf(config.filtering[attrName+"_filter"].toLowerCase()) > -1;
          });

          this._resetFilterTextFields(col);
          this._refreshTable();
      },
      _resetFilterTextFields : function(col) {
          //Reset other Filter Textfields
          for(var i = 0; i < this.cfg.columns.length; i++) {
            if(!col || this.cfg.columns[i].name !== col.name) {
                var attrName = this.toAttributeName(this.cfg.columns[i].name);
                this.$json.setValue(this.cfg.filtering, attrName+"_filter", "");
            }
          }
      },
      _wrapFilterFunction : function (evt, args) {
            args.fn.apply(this, [args.view]);
            this._resetFilterTextFields();
            this._refreshTable();
      },
      showDetails : function (evt) {
            var tr = evt.target.getParentWithName("tr");
            var idx = parseInt(tr.getData("index"), 10);
            
            var item = this.itemsView.initialArray[idx];
            this.$json.setValue(item, 'showDetails', !item.showDetails);

            tr.$dispose();
      }
    }
});