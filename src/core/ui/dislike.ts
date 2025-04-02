import { apiDislike } from "../../io/api-dislike";
import svgRealDislike from "../../svg/realDislike.svg";
import svgRealDisliked from "../../svg/realDisliked.svg";
import { uid } from "../../utils/conf/uid";
import { getCookies } from "../../utils/cookie";
import { CustomElementsInterface } from "../../utils/customelement";
import { debug } from "../../utils/debug";
import { addCss } from "../../utils/element";
import { BLOD } from "../bilibili-old";
import { biliQuickLogin } from "../quickLogin";
import { toast } from "../toast";
import { user } from "../user";

export class Dislike extends HTMLSpanElement implements CustomElementsInterface {
    private disliked = false;
    constructor() {
        super();
        this.classList.add('ulike');
        this.update();
        this.addEventListener('click', ev => {
            ev.stopPropagation();
            if (uid) {
                if (!user.userStatus!.accessKey.token) {
                    toast.error("踩功能需要先启用【账户授权】功能！")();
                    return;
                }
                apiDislike(BLOD.aid, user.userStatus!.accessKey.token, !this.disliked)
                    .then(() => {
                        this.toggle();
                    })
                    .catch(e => {
                        if (e.cause == 65007) {
                            this.toggle();
                            toast.warning('已点过踩！')();
                        }
                        else {
                            toast.error('点踩出错！', e)();
                        }
                    })
            } else {
                biliQuickLogin();
            }
        });
    }
    /** 初始化节点 */
    init() {
        if (uid) {
            // TODO 有获取点踩状态的 api 吗?
        }
        addCss('.ulike {cursor: pointer;}.ulike svg{vertical-align: middle;margin-right: 10px;transform: translateY(-1px);}', `ulike${_MUTEX_}`);
    }
    protected toggle() {
        this.disliked = !this.disliked;
        this.update();
    }
    protected update() {
        this.innerHTML = (this.disliked ? svgRealDisliked : svgRealDislike) + '点踩';
    }
}
customElements.get(`dislike-${_MUTEX_}`) || customElements.define(`dislike-${_MUTEX_}`, Dislike, { extends: 'span' });