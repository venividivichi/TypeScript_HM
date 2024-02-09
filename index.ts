
function DeprecatedMethod(reason: string, alternativeMethod?: string): any {
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
      
        let originalMethod = descriptor.value;
  
        descriptor.value = function(...args: any[]) {
            console.warn(`Warning: Method '${String(propertyKey)}' is deprecated. ${reason}`); 
            if (alternativeMethod) {
                console.warn(`Please use this ${alternativeMethod}.`);
            }
            return originalMethod.apply(this, args);
        };  
  
      return descriptor
    };
  }

  function MinLength(minLength: number): PropertyDecorator {
    return function(target: any, propertyKey: string | symbol) {
      let value = target[propertyKey];
  
      let getter = () => value;
      let setter = (newValue: string) => {
        if (newValue.length < minLength) {
          throw new Error(`Error: The length of '${String(propertyKey)}' should be at least ${minLength} characters.`);
        }
        value = newValue;
      };
  
      Object.defineProperty(target, propertyKey, {
        get: getter,
        set: setter,
        enumerable: true,
        configurable: true,
      });
    };
  }

  function Email(): PropertyDecorator {
    return function(target: any, propertyKey: string | symbol) {
      let value = target[propertyKey];
  
      let getter = () => value;
      let setter = (newValue: string) => {
        let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!emailRegex.test(newValue)) {
          throw new Error(`Error: The value of '${String(propertyKey)}' is not a valid email address.`);
        }
        value = newValue;
      };
  
      Object.defineProperty(target, propertyKey, {
        get: getter,
        set: setter,
        enumerable: true,
        configurable: true,
      });
    };
  }

  function MaxLength(maxLength: number): PropertyDecorator {
    return function(target: any, propertyKey: string | symbol) {
      let value = target[propertyKey];
  
      let getter = () => value;
      let setter = (newValue: string) => {
        if (newValue.length > maxLength) {
          throw new Error(`Error: The length of "${String(propertyKey)}" cannot exceed ${maxLength} characters.`);
        }
        value = newValue;
      };
  
      Object.defineProperty(target, propertyKey, {
        get: getter,
        set: setter,
        enumerable: true,
        configurable: true,
      });
    };
  }


class MyClass {
    
    @MinLength(3)
    @MaxLength(15)
    username: string;
  
    @Email()
    email: string;

    constructor(username: string, email: string) {
        this.username = username;
        this.email = email;
      }

    @DeprecatedMethod('This method is to old.', 'newMethod')
    public oldMethod(): any {
        console.log('Old method is called.');
    }

    public newMethod(): any {
        console.log('New method is called.');
    }
}

let instance = new MyClass('Nazarii', 'nazar.kishman@gmail.com');
instance.oldMethod();