#### Mixin to center content
```
@mixin center {
  display: grid;
  place-items: center;
}
```
####
```
flex-shrink: 0;
```
#### Inline if and chained inline IF
```
condition ? exprIfTrue : exprIfFalse

condition1 ? value1
         : condition2 ? value2
         : condition3 ? value3
         : value4;
```
#### Reseting link styles
```
a {
  color: blue;
  text-decoration: none; /* no underline */
}
```
#### To listen to any event on dom
```
  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key == 'Enter') this.onSend();
  }
```
#### Disabled inputs & events

![image-20211121204948836](C:\Users\maxtu\AppData\Roaming\Typora\typora-user-images\image-20211121204948836.png)

```
```
#### Enter event angular
```
(keyup.enter)="onSend()"
```
#### Target vs current Target

![image-20211121210154402](C:\Users\maxtu\AppData\Roaming\Typora\typora-user-images\image-20211121210154402.png)

```
```
#### Focus element
```
@ViewChild('wordInput') private wordInput: ElementRef;

setTimeout(() => this.wordInput.nativeElement.focus());
```
#### Multiple NgStyles
```
        [ngStyle]="{
          transform: 'translateX(' + progress + '%)',
          transition: '0.3s ease'
        }"
```
#### Returning multiple arrays and destructuring
```
  loadResultsInfo() {
    return [this.currentWordSet, this.resultsArr];
  }
  ----------------------------------------------------------------
    this.resultInfo = this.resultsService.loadResultsInfo();
    [this.currentWordSet, this.resultsArr] = this.resultInfo;
```
#### Conditional styling
```
      [ngStyle]="{
        color: resultsArr[i] === true ? 'green' : 'red'
      }"
```
####

```
```
####![image-20211212103414760](C:\Users\maxtu\AppData\Roaming\Typora\typora-user-images\image-20211212103414760.png)

![image-20211212171505502](C:\Users\maxtu\AppData\Roaming\Typora\typora-user-images\image-20211212171505502.png)

```
```
####
```
```