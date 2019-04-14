# hint-form

Renders input form whose border changes between red and green according to what it contains.

## Props

<!-- @vuese:hint-form:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|value|Watches the changes in the user input|`String`|`false`|''|
|correctResult|Value of the correct result - the one that has green border|`String`|`false`|''|
|placeHolder|Stores the placeholder of the form|`String`|`false`|''|

<!-- @vuese:hint-form:props:end -->


## Events

<!-- @vuese:hint-form:events:start -->
|Event Name|Description|Parameters|
|---|---|---|
|input|emits input to v-model in parent component|-|

<!-- @vuese:hint-form:events:end -->


## Methods

<!-- @vuese:hint-form:methods:start -->
|Method|Description|Parameters|
|---|---|---|
|onInput|enables v-modelling of user inputs|-|

<!-- @vuese:hint-form:methods:end -->


