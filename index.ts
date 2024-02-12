
type DeprecatedMethodOptions = {
    reason: string;
    alternativeMethod?: string;
  };
  
  function DeprecatedMethod(options: DeprecatedMethodOptions): any {
    
    return function(target: any, context: ClassMethodDecoratorContext) {
  
      if (context.kind !== 'method') throw new Error('Method-only decorator');
      
      console.warn(`Warning: Method is deprecated. ${options.reason}`); 
      
      if (options.alternativeMethod) {
        return console.warn(`Please use this: ${options.alternativeMethod}.`);
      }
    
    };  
  
  };
  
  function minLength(limit: number) {
    
    return function (target: Object, propertyKey: string) {
        let value: string;
        const getter = function () {
            return value;
        };
        const setter = function (newVal: string) {
            if (newVal.length < limit) {
                throw new Error(`Your ${propertyKey} should be bigger than ${limit} characters`)
            } else {
                value = newVal;
            }
        };
        Object.defineProperty(target, propertyKey, {
            get: getter,
            set: setter
        });
    }
  }
  
  function maxLength(limit: number) {
    
    return function (target: Object, propertyKey: string) {
        let value: string;
        const getter = function () {
            return value;
        };
        const setter = function (newVal: string) {
            if (newVal.length > limit) {
                throw new Error(`Your ${propertyKey} should be less than ${limit} characters`)
            } else {
                value = newVal;
            }
        };
        Object.defineProperty(target, propertyKey, {
            get: getter,
            set: setter
        });
    }
  }
  
  function email() {
    return function (target: Object, propertyKey: string) {
        let value: string;
        
        let getter = () => value;
        let setter = function (newValue: string) {
            let emailRegex: RegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (!emailRegex.test(newValue)) {
                throw new Error(`Error: The value of '${String(propertyKey)}' is not a valid email address.`)
        };
        Object.defineProperty(target, propertyKey, {
            get: getter,
            set: setter
        });
        }
    }
  }
  
  class MyClass {
    
    //@minLength(3)
    //@maxLength(15)
    username: string;
  
    //@email()
    email: string;
  
    constructor(username: string, email: string) {
        this.username = username;
        this.email = email;
      }
  
    @DeprecatedMethod({ reason: 'This method is too old.', alternativeMethod: 'newMethod' })
    public oldMethod(): any {
        console.log('Old method is called.');
    }
  
    public newMethod(): any {
        console.log('New method is called.');
    }
  }
  
  let instance = new MyClass('Nazarii', 'nazar@gmail');
  instance.oldMethod();