declare module "*.svg" {
    const content: string;
    export default content;
  }
  
declare module "*.pdf" {
    const content: File;
    export default content;
  }
  