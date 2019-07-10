import Translator from 'bazinga-translator';
import Routing from '../../../../../vendor/friendsofsymfony/jsrouting-bundle/Resources/public/js/router.js';


/**
 * Generate url
 *
 * @param route
 * @param props
 * @param absolute
 */
export const url = (route, props, absolute) => Routing.generate(route, props, absolute);


/**
 * Translation
 *
 * @param id
 * @param parameters
 * @param domain
 */
export const trans = (id, parameters = {}, domain = 'messages') => Translator.trans(id, parameters, domain);
