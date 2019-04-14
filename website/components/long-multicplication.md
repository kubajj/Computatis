# long-multicplication

Task to practice multicplication.

## Methods

<!-- @vuese:long-multicplication:methods:start -->
|Method|Description|Parameters|
|---|---|---|
|randomNumber|this method generates a random number in the interval that was specified in the parentheses|minimal value;&nbsp;maximal value|
|genTask|this method generates the task (more of a resetAll method)|-|
|check|this method handles results submitted by user and their evaluation and correction|-|
|checkHint|checks whether all of the inputs in the third row are correct|-|
|giveHint|shows the inputs|-|
|grade|shows the maximal grade of the number|givenNum = number whose grade you want to know|

<!-- @vuese:long-multicplication:methods:end -->


## Computed

<!-- @vuese:long-multicplication:computed:start -->
|Computed|Description|
|---|---|
|decimal|the decimal part of multiplier|
|decRes|the result of the multiplication between number and decimal|
|unit|the unit part of multiplier|
|unitRes|the result of the multiplication between number and unit|
|correctUnit|an array of numbers of the unitRes|
|correctDec|an array of numbers of the decRes|
|correctResultNumbers|digits of the result|
|maxSpaces|number of digits of the result|

<!-- @vuese:long-multicplication:computed:end -->


