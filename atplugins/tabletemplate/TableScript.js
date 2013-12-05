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
    $classpath : "atplugins.tabletemplate.TableScript",
    $statics : {
        INVALID_CONFIGURATION : "Invalid configuration for the Table.",
        MACRO_NOT_FOUND : "Macro %1 could not be found",
        //GENERAL
        TABLE_SECTION_ID : "__table__section",
        SELECTED_ROW_ATTRIBUTE : "_tbl_selected",
        HIGHLIGHTED_ROW_STYLECLASS : "highlighted",
        EVEN_ROW_STYLECLASS : "even",
        ODD_ROW_STYLECLASS : "odd",
        //SELECTION
        SELECTED_ROW_STYLECLASS : "selected",
        //FILTER
        FILTER_POSITION_TOP : "top",
        FILTER_POSITION_BOTTOM : "bottom",
        FILTER_DEFAULT_BINDING_GROUP : "filterGroup",
        //SORTING
        SORTING_DEFAULT_NAME_PREFIX : "SortBy",
        //PAGINATOR
        PAGINATOR_DIV_STYLECLASS : "paginator",
        PAGINATOR_CTRL_STYLECLASS : "nav",
        PAGINATOR_ACTIVE_STYLECLASS : "active",
        PAGINATOR_SYMBOL_FIRST : "<<",
        PAGINATOR_SYMBOL_PREV : "<",
        PAGINATOR_SYMBOL_NEXT : ">",
        PAGINATOR_SYMBOL_LAST : ">>",
        PAGINATOR_ACTION_FIRST : "first",
        PAGINATOR_ACTION_PREV : "prev",
        PAGINATOR_ACTION_NEXT : "next",
        PAGINATOR_ACTION_LAST : "last"
    },
    $dependencies : ['atplugins.tabletemplate.TableCfgBeans'],
    $constructor : function () {
        this.selectedIndices = [];
    },
    $destructor : function() {
        this.itemsView.$dispose();
        this.selectedIndices = null;
    },
    $prototype : {
        
        _cfgBean : "atplugins.tabletemplate.TableCfgBeans.TableCfg",

        $dataReady : function() {
            var normalizeArg = {
                beanName : this._cfgBean,
                json : this.data.table
            };
            this._cfgOk = aria.core.JsonValidator.normalize(normalizeArg, false);

            if(this._cfgOk) {
                this.cfg = this.data.table.config;
                this.setPageSize();
                this._resetSelection();
            }
        },
        setPageSize : function() {
            if(this.cfg.paging.active) {
                this.itemsView.setPageSize(this.cfg.paging.pageSize);
            }
        },
        highlight : function (evt) {
            var element = evt.target.getParentWithName("tr");
            element.classList.add(this.HIGHLIGHTED_ROW_STYLECLASS);
            element.$dispose();
        },
        unhighlight : function (evt) {
            var element = evt.target.getParentWithName("tr");
            element.classList.remove(this.HIGHLIGHTED_ROW_STYLECLASS);
            element.$dispose();
        },
        showPage : function (ec, pageIdx) {
            var view = this.itemsView;
            view.currentPageIndex = pageIdx;
            this._refreshTable();
            return false; // to prevent the anchor to generate a page navigation
        },
        paginate : function(ec, action) {
            //shortcut
            var index = this.itemsView.currentPageIndex;
            switch(action) {
                case this.PAGINATOR_ACTION_FIRST:
                    index=0;
                    break;
                case this.PAGINATOR_ACTION_PREV:
                    if(index > 0) {
                        index--;
                    }
                    break;
                case this.PAGINATOR_ACTION_NEXT:
                    if(index < this.itemsView.pages.length-1) {
                        index++;
                    }
                    break;
                case this.PAGINATOR_ACTION_LAST:
                    index=this.itemsView.pages.length-1;
                    break;
                default:
                    index=0;
            }
            this.itemsView.currentPageIndex = index;
            this._refreshTable();
            return false;
        },
        takeSelection : function(ec, args) {
            //only do something when selection is enabled
            if(!this.cfg.selection.active) {
                return;
            }
            var idx = args.index, view = this.itemsView, items = this.itemsView.initialArray;
            var lastSelectedIdx = this.cfg.selection.lastSelectedIdx;
            //check for multiple selection
            if(ec.shiftKey) {
                //retrieve last selected idx, check if its on the same page, check if its higher or lower, go up or down an select the rows
                //find the last selected index of the current page
                if(lastSelectedIdx !== undefined) {
                    if(idx == lastSelectedIdx) {
                        this._setSelection(idx, !items[idx]._tbl_selected);
                    } else {
                        if(lastSelectedIdx >= view.pages[view.currentPageIndex].firstItemNumber-1 &&
                            lastSelectedIdx <= view.pages[view.currentPageIndex].lastItemNumber-1) {
                            if(lastSelectedIdx > idx) {
                                //go up
                                for(var i = idx ; i < lastSelectedIdx ; i++) {
                                    this._setSelection(idx, true);
                                }
                            } else if(lastSelectedIdx < idx) {
                                //go down
                                 for(var i = lastSelectedIdx ; i <= idx ; i++) {
                                    this._setSelection(i, true);
                                }
                            }
                        }
                    }
                } else {
                    //no previous selection just select the clicked row
                    this._setSelection(idx, true);
                }
            } else if(this.cfg.selection.multiple) {
                this._setSelection(idx, !items[idx]._tbl_selected);
            } else if(ec.ctrlKey){
                this._setSelection(idx, !items[idx]._tbl_selected);
            } else {
                //single selection, reset selections
                var val = !items[idx]._tbl_selected;
                this._resetSelection();
                this._setSelection(idx, val);
            }
            this.cfg.selection.lastSelectedIdx = idx;
        },
        getSelectedIndices : function() {
            return this.cfg.selection.selectedIndices || [];
        },
        _setSelection : function (idx, selected) {
            if(!this.cfg.selection.selectedIndices) {
                this.cfg.selection.selectedIndices = [];
            }
            if(selected) {
                this.cfg.selection.selectedIndices.push(idx);
            } else {
                this.cfg.selection.selectedIndices.splice(this.cfg.selection.selectedIndices.indexOf(idx), 1);
            }
            this.$json.setValue(this.itemsView.initialArray[idx], this.SELECTED_ROW_ATTRIBUTE, selected);
        },
        _resetSelection : function () {
            if(this.cfg.selection.selectedIndices) {
                while(this.cfg.selection.selectedIndices.length > 0){
                    this._setSelection(this.cfg.selection.selectedIndices[0], false);
                }
            }
        },
        _refreshTable : function () {
            this.$refresh({
                    outputSection : this.cfg.tableSectionId
            });
        },
        _createDefaultSortFunction : function(col) {
            return function(o) {
                return col.value(o.value);
            };
        },
        _wrapFilterFunction : function (evt, args) {
            args.fn.apply(this, [args.view]);
            this._refreshTable();
        }
    }
});