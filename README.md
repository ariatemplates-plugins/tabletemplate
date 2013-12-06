# Table Template plugin for Aria Templates #

The aim of this template is to help [Aria Templates](http://ariatemplates.com/) users getting started with integrating a table in to their application. 
It unifies standard Aria Templates features to build a feature rich table control while hiding the hassle of generating the html table structure from the user. 

It includes highlighting, selection, sorting, paging and filtering out-of-the-box and is designed to be easily enhanced.

This short introduction shows the basic configuration possiblities and gives an overview of the internal structure of the component for those who are interested in hooking it to modify the component according to their needs.

For a live sample click [here](http://ariatemplates-plugins.github.io/tabletemplate).

# Documentation #

## Configuration ##

The template can be embedded in another template as follows :

    {@aria:Template {
        defaultTemplate: "atplugins.tabletemplate.Table",
        data: {
          table : {
            items: [{"element": "Hydrogen"}],
            config : {
                columns : [
                	{name: 'Element',
                     value: function(row) {return row.element}
                    }]
            }
          }
        }
    }/}

The most important configuration aspects are the `table.items` which is the array of objects to be displayed and the `table.config.columns` array which specfies the columns of the table and their look/behaviour.


The `table.config.columns` array contains a configuration object for each column. The following things can be specified for a column :
<table>
  <tr>
    <th>Config Param</th><th>Explanation</th>
  </tr>
  <tr>
    <td>Name</td><td>Name of the Column</td>
  </tr>
  <tr>
    <td>value</td><td>A function evaluating the value to be displayed in the table cell. It gets the current row as parameter.</td>
  </tr>
  <tr>
    <td>cssClasses</td><td>Array of strings to be added to the class param of the generated column</td>
  </tr>
  <tr>
    <td>sortable</td><td>Boolean to enable/disable sorting for the column</td>
  </tr>
  <tr>
    <td>sortFunction</td><td>Function to be used for sorting, when omitted the function specified in the `value` parameter is used.</td>
  </tr>
  <tr>
    <td>macro</td><td>If the table cell should contain more complex stuff (such as widgets) you can provide a macro name here that is called to generate the cell content.</td>
  </tr>
</table>


### Sorting Configuration ###

The example below demonstrates multiple ways to configure and use the sorting capabilities.

The Atomic Number column in this example is not sortable because the default value for `sortable` is `false`.

The Symbol column is sortable and the `value`-Function is used for sorting.

The Name column does not have a `value`-Function because the cell content is generated using the macro `macroForNameCell`. Therefore the `sortFunction` is defined to specify how to sort.

**NOTE:** The specified `sortFunction` is directly passed to the underlying `SortIndicator`. You can find out more about the SortIndicator [here](http://ariatemplates.com/usermanual/latest/sortindicator).

Complete Examples can be found in the samples folder.

    {@aria:Template {
        defaultTemplate: "atplugins.tabletemplate.Table",
        data: {
          table : {
            items: [...],
            config : {
                columns : [
                       {
                          name:"Atomic Number",
                          value:function(row) {
                             return row.atomic_number;
                          }
                       },
                       {
                          name:"Symbol",
                          value:function(row) {
                             return row.symbol;
                          },
                          sortable:true
                       },
                       {
                          name:"Name",
                          sortable:true,
                          sortFunction : function(o) {
                            return o.value.name;
                          },
                          macro : "macroForNameCell"
                       }]
            }
          }
        }
    }/}

### Filter Configuration ###

This example demonstrates the filter configuration. Within the `table.config` object you can specify a `filtering` object with different configruation properties. Filters generated based on this configuration are always placed above the table and consists of multiple RadioButtons to allow switching between filter states. The RadioButtons are generated using the configurations inside the `filters` array. A filter configuration consists of a label for the filter and a filtering function, which gets the view as parameter.

Complete Examples can be found in the samples folder.

    {@aria:Template {
        defaultTemplate: "atplugins.tabletemplate.Table",
        data: {
          table : {
                items: [...],
            config : {
                filtering : {
                  active : true,
                  filters : [{
                            label : "Show all items", 
                            keyValue : "all", 
                            fn : function (view) {
                              view.allFilteredIn();
                            },{
                            label : "Show no items", 
                            keyValue : "none", 
                            fn : function (view) {
                              view.allFilteredOut();
                            },{
                            label : "Show items ending with \"ium\"", 
                            keyValue : "ium", 
                            fn : function (view) {
                              view.filterIn(view.FILTER_SET, function(o) {
                                return (o.value.name.indexOf("ium", o.value.name.length - "ium".length) !== -1);
                              });
                            }],
                  filterGroup : "all"
                },
                columns : [...]
            }
          }
        }
    }/}

### Paging Configuration ###

Paging is configured in the `paging` object inside the `table.config`. It is possible to enable/disable paging, specifying if the paginator control should be above or below the table and the desired page size.

    {@aria:Template {
        defaultTemplate: "atplugins.tabletemplate.Table",
        data: {
          table : {
            items: [...],
            config : {
                paging : {
                  active : true,
                  position: "top",
                  pageSize : 10
                },
                columns : [...]
            }
          }
        }
    }/}

Complete Examples can be found in the samples folder.

## Defaults ##

Apart from the configuration defaults which can be found in the ConfigBeans `atplugins.tabletemplate.TableCfgBeans`, the Table Template has some default behaviours which are described below.

### Sorting Defaults ###

When specifing the configuration for a column it is possible to define if the column should be sortable or not. Additionally it is possible to define a special function to be used for sorting purposes (it will be passed as ` sortKeyGetter` to the SortIndicator of Aria Templates). If no `sortFunction` is defined then the `value`-Function will be used for sorting. 
**Attention:** ensure that either the `sortFunction` or the `value`-Function is specified if you want the column to be sortable when using a `macro` to define the cell content.

### CSS Classes ###

The following table shows an overview of the default css classes added to specific elements.

<table>
  <tr>
    <th>Element</th><th>Added CSS Class</th>
  </tr>
  <tr>
    <td>th</td><td>th- + column Name</td>
  </tr>
  <tr>
    <td>tr in the tbody</td><td>row_ + row Index</td>
  </tr>
  <tr>
    <td>Odd rows</td><td>odd</td>
  </tr>
  <tr>
    <td>Even rows</td><td>even</td>
  </tr>
  <tr>
    <td>Selected row(s)</td><td>selected</td>
  </tr>
  <tr>
    <td>Highlighted row</td><td>highlighted</td>
  </tr>
</table>



## Internal Structure / Extension points ##

In order to be able to extend the Table Template and add custom features to it you will need to understand its internal structure and what extension points are currently in place.

Below you can find a list of the macros called inside the template to find at which point you might want to include your code when extending the table. To keep it readable the following list only contains the names of the macros in the order in which they are called within the template and **?** indicates that the macro is only called under certain conditions.
The names should be self-explanatory. To know more about the macros and the parameters that they get please check out the code.

    main
      writeTable
        writeFilters || call specified filtering macro
        ?writePaginator
        openTable
          writeTableAttributes
            writeTableId
            writeCssClasses
          writeTableHeader
            writeTableHeaderRowContent
              openTableHeaderRow
              writeTableHeaderContent
                openTableHeader
                writeHeaderRowContent
                  ?createSortIndicator
                closeTableHeader
              closeTableHeaderRow
          writeTableBody
            writeTableBodyContent
              writeTableRow
                openTableRow
                  writeTableRowContent
                    column.value || call specified column content macro
                closeTableRow
        closeTable
        ?writePaginator

## Development ##

When forking/downloading use the following scripts after the usual *npm install*:

- *npm run-script lint* : runs JShint, verifies lowercaseand checks files indentation
- *npm run-script build* : packages the plugin only with [atpackager](https://github.com/ariatemplates/atpackager "atpackager") and put the results in build/output folder
- *npm run-script test* : run all unit tests in PhantomJS with [attester](http://attester.ariatemplates.com "attester")
- *npm run-script start* : starts [attester](http://attester.ariatemplates.com "attester") and waits for real browsers to connect
- *npm run-script sample* : starts a webserver to run the samples (at <http://localhost:8080/> or <http://localhost:8080/index.html?devMode=true> )

# License #

[Apache License 2.0](https://github.com/ariatemplates-plugins/table/blob/master/LICENSE)