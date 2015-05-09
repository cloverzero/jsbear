# �����븴������

tags�� javascript cut-and-copy execcommand

---

by [Matt Gaunt](http://www.html5rocks.com/profiles/#mattgaunt)
����ʱ�䣺 2015��4��15��
����ʱ�䣺 2015��4��15��

IE10����֮��İ汾����˶ԡ����С��͡����ơ������֧�֣�ͨ����[Document.execCommand()](https://www.google.com/url?q=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FAPI%2FDocument%2FexecCommand&sa=D&sntz=1&usg=AFQjCNGXS6fCPqMRGr1_NECYZuxIOyVURg)����������Chrome 43��ʼ����Щ����Ҳ��Chrome֧���ˡ�

����Щ���ִ�к���������б�ѡ�е��ı��ͻᱻ���л��Ƶ��û��ļ������С����������Ϊ�û��ṩһ�ּ򵥵ķ�ʽ����ѡ�в����ı������ƽ��������С�

�����ǵ�������� [Selection API](https://developer.mozilla.org/en-US/docs/Web/API/Selection) һ��ʹ��ʱ��ͨ�����ѡ��һ�δ��㸴�ƽ���������ı����⽫��ü���ʵ�ã������ǽ�������������ƪ������Ҫ���ܵ���ϸ���ݡ�

## ��ʾ��

Ϊ�����ʾ�������������һ����ť�����ڸ���һ�� email ��ַ���������С�

������ HTML �������һ�� email ��ַ��һ�����ڵ������и��Ƶİ�ť��

```html
<p>Email me at <a class="js-emaillink" href="mailto:matt@example.co.uk">matt@example.co.uk</a></p>

<p><button class="js-emailcopybtn"><img src="./images/copy-icon.png" /></button></p>
```

������ JavaScript�У�����Ϊ��ť�����һ������¼��Ĵ�������������ѡ�� ```js-emaillink``` ê���е� email ��ַ����ִ�и������email ��ַ�����ƽ������壬Ȼ��ȡ��ѡ�У������û��Ͳ��ῴ��ѡ����ꡣ

```js
var copyEmailBtn = document.querySelector('.js-emailcopybtn');  
copyEmailBtn.addEventListener('click', function(event) {  
  // ѡ�� email ���ӵ��ı�  
  var emailLink = document.querySelector('.js-emaillink');  
  var range = document.createRange();  
  range.selectNode(emailLink);  
  window.getSelection().addRange(range);  
    
  try {  
    // �����Ѿ�ѡ�����ı�������ִ�С����ơ�����  
    var successful = document.execCommand('copy');  
    var msg = successful ? 'successful' : 'unsuccessful';  
    console.log('Copy email command was ' + msg);  
  } catch(err) {  
    console.log('Oops, unable to copy');  
  }  
    
  // �Ƴ�ѡ�� - ע��: �����֧�ֵĻ�Ӧ��ʹ�� removeRange(range)  
  window.getSelection().removeAllRanges();  
});
```

��������ʹ���� [Selection API](https://developer.mozilla.org/en-US/docs/Web/API/Selection) ��һ���������� [window.getSelection](https://developer.mozilla.org/en-US/docs/Web/API/Window/getSelection)  ��ѡ������Ҫ���ƽ��û��������ê���е��ı����ڵ��� ```document.execCommand``` ֮�����ǿ���ͨ������ [window.getSelection().removeAllRanges()](https://developer.mozilla.org/en-US/docs/Web/API/Selection/removeAllRanges) ���Ƴ���ѡ����


�������Ҫȷ��ִ��Ч���Ƿ�������Ը������Լ�� ```document.execCommand()``` �ķ���ֵ; �����������֧�ֻ�û�б�����Ϊ�򿪵Ļ��������� ```false```�����ǿ��Խ� ```execCommand()``` д�� try-catch ��������ĳЩ��������ִ�С����С��͡����ơ�����ʱ[�׳��Ĵ���](https://dvcs.w3.org/hg/editing/raw-file/tip/editing.html#the-copy-command)��


�����С�������������Ҫɾ���ı����е��ı�����ʹ���ǿ�ͨ����������ʵĳ�����

��HTML��ʹ�� ```textarea``` �� ```button```��

```html
<p><textarea class="js-cuttextarea">Hello I'm some text</textarea></p>
  
<p><button class="js-textareacutbtn" disable>Cut Textarea</button></p>
```

���ǿ��Լ�������ͨ�����·�ʽ:

```js
var cutTextareaBtn = document.querySelector('.js-textareacutbtn');

cutTextareaBtn.addEventListener('click', function(event) {  
  var cutTextarea = document.querySelector('.js-cuttextarea');  
  cutTextarea.select();

  try {  
    var successful = document.execCommand('cut');  
    var msg = successful ? 'successful' : 'unsuccessful';  
    console.log('Cutting text command was ' + msg);  
  } catch(err) {  
    console.log('Oops, unable to cut');  
  }  
});
```

## queryCommandSupported �� queryCommandEnabled

�ڵ��� ```document.execCommand()``` ֮ǰ����Ӧ��ͨ�� [document.queryCommandSupported()](https://developer.mozilla.org/en-US/docs/Web/API/Document/queryCommandSupported) ����ȷ�����API�ǿ��õġ������ǵ�ʾ���У����ǿ��԰��������֧��״�������ð�ť�Ŀ���״̬�����磺

```js
copyEmailBtn.disabled = !document.queryCommandSupported('copy');
```

���� [document.queryCommandSupported()](https://dvcs.w3.org/hg/editing/raw-file/tip/editing.html#querycommandsupported()) �� [document.queryCommandEnable()](https://dvcs.w3.org/hg/editing/raw-file/tip/editing.html#querycommandenabled()) ֮�������һ�����ڼ�⡸���С��͡����ơ��Ƿ������֧�֣���һ�����ǣ������ǰû���ı���ѡ�У���ô�������Ͳ��ǡ�enabled���ġ�����Ҫִ����Щ����ʱ��û��ѡ���ı���Ҫ��ʾһ����Ϣ���û�ʱ����������ر����á�

## �����֧��״��

IE 10+��Chrome 43+���� Opera 29+ ֧����Щ���

���֧����Щ�������Ҫ�������ñ����[���忴����](https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand)����������޸����û�����ᱨ��

Safari ��֧����Щ���

## ��֪ Bugs

* ���� ```queryCommadSupported()``` ����ѯ�����С��͡����ơ�����[���Ƿ��� ```false```ֱ���û������˽���֮��](http://crbug.com/476508)���⵼���㲻�ܰ���� UI ����Ϊ��disabled������ʾ�������֧��������
* [ͨ�������߹��ߵ��� ```queryCommandSupported()``` ���Ƿ��� ```false```](http://crbug.com/475868)��
* Ŀǰ[�����С�ֻ������ͨ������ֶ�ѡ���ı�������²Ź���](http://crbug.com/476848)��