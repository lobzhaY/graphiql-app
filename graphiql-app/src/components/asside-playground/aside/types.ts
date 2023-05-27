export interface Arg {
    name: string;
    description: string;
    type: TypeRef;
  }
  
  export interface Directive {
    name: string;
    description: string;
    locations: string[];
    args: Arg[];
  }
  
  export interface Field {
    name: string;
    description: string;
    args: Arg[];
    type: TypeRef;
    isDeprecated: boolean;
    deprecationReason: string;
  }
  
  export interface TypeRef {
    kind: string;
    name: string;
    ofType?: TypeRef;
  }
  
  export interface FullType {
    kind: string;
    name: string;
    description: string;
    fields: Field[];
    inputFields: Arg[];
    interfaces: TypeRef[];
    enumValues: EnumValue[];
    possibleTypes: TypeRef[];
  }
  
  export interface EnumValue {
    name: string;
    description: string;
    isDeprecated: boolean;
    deprecationReason: string;
  }
  
  export interface Schema {
    queryType: {
      name: string;
    };
    mutationType: {
      name: string;
    };
    subscriptionType: {
      name: string;
    };
    types: FullType[];
    directives: Directive[];
  }