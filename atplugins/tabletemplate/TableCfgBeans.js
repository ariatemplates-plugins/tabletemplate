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

Aria.beanDefinitions({
    $package : "atplugins.tabletemplate.TableCfgBeans",
    $description : "Definition of the config for the table template",
    $namespaces : {
        "json" : "aria.core.JsonTypes"
    },
    $beans : {
        "TableCfg" : {
            $type : "json:Object",
            $description : "Container for the table configuration",
            $properties : {
                "items" : {
                    $type : "json:Array",
                    $description : "The Array to be displayed in the table",
                    $contentType : {
                        $type : "json:ObjectRef",
                        $description : "The items to be displayed"
                    }
                },
                "config" : {
                    $type : "config",
                    $description : "Configuration of the table template"
                }
            }
        },
        "config" : {
            $type : "json:Object",
            $description : "Configuration of the table template",
            $properties : {
                "tableId" : {
                    $type : "json:String",
                    $description : "Id to use for the table"
                },
                "tableSectionId" : {
                    $type : "json:String",
                    $description : "Id to use for the section sourriding the table",
                    $default : "__table__section"
                },
                "columns" : {
                    $type : "json:Array",
                    $description : "List of columns",
                    $contentType : {
                        $type : "ColumnCfg",
                        $description : "A column configuration"
                    }
                },
                "cssClasses" : {
                    $type : "json:Array",
                    $description : "Array of cssClasses which are applied to the table",
                    $contentType : {
                        $type : "json:String",
                        $description : "A css class"
                    }
                },
                "filtering" : {
                    $type : "TableFilterCfg",
                    $description : "Filter Configuration",
                    $default : {}
                },
                "paging" : {
                    $type : "TablePagingCfg",
                    $description : "Paging Configuration",
                    $default : {}
                },
                "selection" : {
                    $type : "TableSelectionCfg",
                    $description : "Selection Configuration",
                    $default : {}
                }
            }
        },
        "TableFilterCfg" : {
            $type : "json:Object",
            $description : "Configuration of the filtering",
            $properties : {
                "active" : {
                    $type : "json:Boolean",
                    $description : "Switch to enable/disable filtering for the table",
                    $default : false
                },
                "filters" : {
                    $type : "json:Array",
                    $description : "List of filters",
                    $contentType : {
                        $type : "FilterCfg",
                        $description : "A Filter"
                    }
                },
                "macro" : {
                    $type : "json:String",
                    $description : "Name of the macro to generate the filters"
                },
                "filterGroup" : {
                    $type : "json:String",
                    $description : "The variable name where the filter value is stored",
                    $default : "all"
                }
            }
        },
        "FilterCfg" : {
            $type : "json:Object",
            $description : "Filter Definition",
            $properties : {
                "label" : {
                    $type : "json:String",
                    $description : "Label to use for the filter",
                    $mandatory : true
                },
                "keyValue" : {
                    $type : "json:String",
                    $description : "KeyValue to use for the filter",
                    $mandatory : true
                },
                "fn" : {
                    $type : "json:FunctionRef",
                    $description : "Function to use to filter"
                }
            }
        },
        "TablePagingCfg" : {
            $type : "json:Object",
            $description : "Configuration of the filtering",
            $properties : {
                "active" : {
                    $type : "json:Boolean",
                    $description : "Switch to enable/disable paging for the table",
                    $default : false
                },
                "position" : {
                    $type : "json:Enum",
                    $description : "Position of the paging. only top and bottom are allowed",
                    $enumValues : ["bottom", "top"],
                    $default : "bottom"
                },
                "pageSize" : {
                    $type : "json:Integer",
                    $description : "pageSize",
                    $default: 15
                }
            }
        },
        "TableSelectionCfg" : {
            $type : "json:Object",
            $description : "Configuration of the filtering",
            $properties : {
                "active" : {
                    $type : "json:Boolean",
                    $description : "Switch to enable/disable selection for the table",
                    $default : true
                },
                "multiple" : {
                    $type : "json:Boolean",
                    $description : "Switch to enable/disable multi selection for the table",
                    $default : false
                }
            }
        },
        "ColumnCfg" : {
            $type : "json:Object",
            $description : "Column Definition",
            $properties : {
                "name" : {
                    $type : "json:String",
                    $description : "Name of the column",
                    $mandatory : true
                },
                "cssClasses" : {
                    $type : "json:Array",
                    $description : "Array of cssClasses which are applied to the column",
                    $contentType : {
                        $type : "json:String",
                        $description : "A css class"
                    }
                },
                "value" : {
                    $type : "json:FunctionRef",
                    $description : "Function to extract the column data, can be omitted if a macro is specified."
                },
                "sortable" : {
                    $type : "json:Boolean",
                    $description : "Switch to enable/disable selection for the table",
                    $default : false
                },
                "sortFunction" : {
                    $type : "json:FunctionRef",
                    $description : "Function to define the sorting for the column. If no function is defined the value-function is used for sorting."
                },
                "macro" : {
                    $type : "json:String",
                    $description : "Name of the macro to generate the column content"
                }
            }
        }
    }
});