const jbInfo = process.env.JB_DIST_INFO
	&& JSON.parse(process.env.JB_DIST_INFO) || ''
const jbModule = jbInfo && jbInfo.mapping_id && jbInfo.mapping_id.name || ''

module.exports = function() {
	if (/\[企点OPEN\]/.test(jbModule)) {
		return 'open'
	} else if (/\[企点CQQ\]/.test(jbModule)) {
		return 'cqqgeneral'
	} else {
		return false
	}
}
