import Swal from 'sweetalert2';

export class ItiMessageService {

    public TypeSuccess = 'success';
    public TypeError = 'error';
    public TypeWarning = 'warning';
    public TypeInfo = 'info';
    public TypeQuestion: any = 'question';

    public PositionTop = 'top';
    public PositionTopStart = 'top-start';
    public PositionTopEnd = 'top-end';
    public PositionCenter = 'center';
    public PositionCenterStart = 'center-start';
    public PositionCenterEnd = 'center-end';
    public PositionBottom = 'bottom';
    public PositionBottomStart = 'bottom-start';
    public PositionBottomEnd = 'bottom-end';

    private defaultTimeout = 3000;
    private customClass = '';
    private animation = true;

    public setCustomClass(customClass: string) {
        this.customClass = customClass;
    }

    public setAnimation(animation: boolean) {
        this.animation = animation;
    }

    // Aviso flotante que desaparece solo tras un tiempo
    public toast(texto: string, tipo: any = this.TypeSuccess, timeout: number = this.defaultTimeout,
                 posicion: any = this.PositionTop,
                 customClass: any = this.customClass, animation: boolean = this.animation) {
        Swal.fire({
            position: posicion,
            showConfirmButton: false,
            timer: timeout,
            title: texto,
            toast: true,
            type: tipo,
            customClass,
            animation,
        });
    }

    public alert(titulo: string, texto: string = '', tipo: any = this.TypeSuccess,
                 timeout: number = this.defaultTimeout, posicion: any = this.PositionCenter,
                 customClass: any = this.customClass, animation: boolean = this.animation) {
        Swal.fire({
            position: posicion,
            text: texto,
            timer: timeout,
            title: titulo,
            type: tipo,
            customClass,
            animation,
        });
    }

    public confirm(texto: string, titulo = 'Pregunta', cb: (res: boolean) => void,
                   customClass: any = this.customClass, animation: boolean = this.animation) {
        Swal.fire({
            cancelButtonText: 'No',
            confirmButtonText: 'Si',
            showCancelButton: true,
            text: texto,
            title: titulo,
            type: this.TypeQuestion,
            customClass,
            animation,
        }).then((result: any) => {
            if (result.value) {
                cb(true);
            } else {
                cb(false);
            }
        });
    }

    public showLoading(customClass: any = this.customClass) {
        Swal.fire({
            title: 'Cargando . . .',
            customClass,
        });
        Swal.showLoading();
    }

    public hideLoading() {
        Swal.close();
    }
}

export const itiMessageService = new ItiMessageService();
