import { HttpParams } from '@angular/common/http';

export default class Utils {

  static setDate(obj: any) {
    return obj ? new Date(obj) : null;
  }

  static setParamsFromArgs(params: HttpParams, args: any = {}): HttpParams {
    if (args.page) {
      params = params.set('page', args.page);
    }
    if (args.perPage) {
      params = params.set('perPage', args.perPage);
    }
    if (args.orderBy) {
      params = params.set('orderBy', args.orderBy);

      if (args.direction) {
        if (args.direction === -1) {
          params = params.set('direction', 'ASC');
        } else {
          params = params.set('direction', 'DESC');
        }
      }
    }

    if (args.searchField && args.searchText) {
      params = params.set('searchField', args.searchField);
      params = params.set('searchText', args.searchText);
    }

    return params;
  }


  static getCurrentSpace() {
    return localStorage.getItem('currentSpace') || 'public-sapce';
  }

  static isPublic() {
    return !(localStorage.getItem('currentSpace') === 'professional-space');
  }


  /**
    * Returns type,ext,viewer of files.
    *
    * @param fileName
    */
  static getFileMimeType(fileName: string) {
    let ext = fileName.split('.').pop();
    const fileExt = ext;
    let type, viewer;
   /* let image =['png', 'jpg', 'jpeg', 'gif']
    let textExtension=[]
    let textType=[]
    let applicationExtension=['abw','arc','azw','bin','bpmn','cmmn','dmn','bz','bz2','csh','doc','docx','jar','js','json','odt','pdf','ppt','pptx','rar']
    let applicationType=['x-abiword','octet-stream','vnd.amazon.ebook','octet-stream','octet-stream','octet-stream',
    'octet-stream','x-bzip','x-bzip2','x-csh','msword','vnd.openxmlformats-officedocument.wordprocessingml.document','java-archive',
    'javascript','json','vnd.oasis.opendocument.text','pdf','vnd.ms-powerpoint','vnd.openxmlformats-officedocument.presentationml.presentation','x-rar-compressed']*/
    ext = ext && ext.toLowerCase();
    ext = ext && ['png', 'jpg', 'jpeg', 'gif'].includes(ext) ? 'image' : (ext && ['bpmn'].includes(ext) ? 'bpmn' : ext);
    switch (ext) {
      case 'pdf':
        type = 'application/pdf';
        viewer = 'pdf';
        break;
      case 'image':
        type = `image/${fileExt}`;
        viewer = 'image';
        break;
      case 'bpmn':
        type = 'application/octet-stream';
        break;
      case 'cmmn':
        type = 'application/octet-stream';
        break;
      case 'dmn':
        type = 'application/octet-stream';
        break;
      case 'docx':
        type = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
        break;
      case 'doc':
        type = 'application/msword';
        break;
      case 'xls':
        type = 'application/vnd.ms-excel';
        break;
        case 'xlsx':
        type = 'application/octet-stream';
        break;
      case 'csv':
        type = 'text/csv';
        break;
      case 'json':
        type = 'application/json';
        break;
        case 'ppt':
          type = 'application/vnd.ms-powerpoint';
          break;
        case 'pptx':
          type = 'application/vnd.openxmlformats-officedocument.presentationml.presentation';
          break;
      case 'jar':
        type = 'application/java-archive';
        break;
      case 'json':
        type = 'application/json';
        break;
      default:
        type = null;
    }
    return {
      type, ext, viewer
    };
  }
}
