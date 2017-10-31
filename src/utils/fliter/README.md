### Fliter Usage

```jsx
    ...
    import { FStringPrivacy, FTimeStamp } from './../../utils/fliter';
    ...
    export class example extends React.Component {
        ...
        render(){
            return (
                <div>
                    {
                        FStringPrivacy('13622708768', 3, 4) // 136****8768
                        FStringPrivacy('谢惠明', 1, 1) // 谢*明
                        FTimeStamp('1488454362', 'yyyy-MM-dd', 'Zh') // 2015年01月05日
                        FTimeStamp('1488454362', 'yyyy-MM-dd') // 2015-01-05
                    }
                </div> 
            );
        }
    }
    export default example;
```
### Fliter Method
- FStringPrivacy(data, start, end)  
隐私字符串隐藏 ex:131****3456    
 data = {String|Number} 隐私字符串
 start = {Number} 字符串前面保留字符数
 end = {Number} 字符串末尾保留字符数
     
- FTimeStamp(time, type, Zh)  
格式化时间戳    
data = '时间戳'    
type = 'MM-dd': 01-05 (Zh='Zh' 01月05日)    
type = 'HH:mm': 11:12 (Zh='Zh' 11时12分)    
type = 'yyyy-MM-dd': 2015-01-05 (Zh='Zh' 2015年01月05日)    
type = 'yyyy-MM-dd HH:mm': 2015-01-05 11:12 (Zh='Zh' 2015年01月05日 11时12分)    
不传type默认: 2015-01-05 11:12:13 (Zh='Zh' 2015年01月05日 11时12分13秒) = FTimeStamp('1488454362', null, 'Zh')  
           