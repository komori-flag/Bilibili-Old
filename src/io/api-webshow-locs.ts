import { BV2avAll } from "../utils/abv";
import { objUrl } from "../utils/format/url";
import { jsonCheck, IApiData } from "./api";
import { URLS } from "./urls";

interface IApiWebshowLocsData extends IApiData {
    pf?: number;
    ids: number[];
}
export interface IApiWebshowLocsResponse {
    activity_type: number;
    ad_cb: string;
    ad_desc: string;
    adver_name: string;
    agency: string;
    area: number;
    asg_id: number;
    business_mark: unknown;
    card_type: number;
    cm_mark: number;
    contract_id: string;
    creative_type: number;
    epid: number;
    id: number;
    inline: { inline_use_same: number, inline_type: number, inline_url: string, inline_barrage_switch: number };
    intro: string;
    is_ad: boolean;
    is_ad_loc: boolean;
    label: string;
    litpic: string;
    mid: string;
    name: string;
    null_frame: boolean;
    operater: string;
    pic: string;
    pic_main_color: string;
    pos_num: number;
    request_id: string;
    res_id: number;
    room: number;
    season: unknown;
    server_type: number
    src_id: number;
    stime: number;
    style: number;
    sub_title: string;
    title: string;
    url: string;
}
export function ApiWebshowLocs(data: IApiWebshowLocsData) {
    return new Promise((resolve: (value: IApiWebshowLocsResponse[][]) => void, reject) => {
        fetch(objUrl(URLS.WEBSHOW_LOCS, {
            pf: 0,
            ids: data.ids.join(',')
        }))
            .then(d => d.text())
            .then(d => resolve(jsonCheck(BV2avAll(d)).data))
            .catch(e => reject(e));
    });
}