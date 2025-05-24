#words to include while giving prompt
INCLUDE_KEYWORDS = {
    'like', 'love', 'include', 'want', 'with', 'prefer', 'enjoy', 'looking',
    'need', 'interested', 'favor', 'wish', 'choose', 'require', 'add', 'pick',
    'select', 'hope', 'desire', 'accept', 'appreciate', 'keen', 'fond', 'favoring',
    'crave', 'seek', 'inclined', 'opt', 'request'
}

#words to exclude
EXCLUDE_KEYWORDS = {
    'not', 'exclude', 'avoid', 'without', 'nothing', 'skip', 'dislike',
    'never', 'none', 'refuse', 'reject', 'remove', 'deny', 'lack',
    'bypass', 'ban', 'prohibit', 'decline', 'omit', 'except',
    'nope', 'nix', 'hate', 'forbid'
}

#stopwords to remove from processing prompt
STOP_WORDS = {'i', 'me', 'my', 'myself', 'we', 'our', 'ours', 'ourselves', 'you', 'your', 'yours',
 'yourself', 'yourselves', 'he', 'him', 'his', 'himself', 'she', 'her', 'hers',
 'herself', 'it', 'its', 'itself', 'they', 'them', 'their', 'theirs', 'themselves',
 'what', 'which', 'who', 'whom', 'this', 'that', 'these', 'those', 'am', 'is', 'are',
 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'having', 'do', 'does',
 'did', 'doing', 'a', 'an', 'the', 'and', 'but', 'if', 'or', 'because', 'as', 'until',
 'while', 'of', 'at', 'by', 'for', 'with', 'about', 'against', 'between', 'into',
 'through', 'during', 'before', 'after', 'above', 'below', 'to', 'from', 'up', 'down',
 'in', 'out', 'on', 'off', 'over', 'under', 'again', 'further', 'then', 'once', 'here',
 'there', 'when', 'where', 'why', 'how', 'all', 'any', 'both', 'each', 'few', 'more',
 'most', 'other', 'some', 'such', 'no', 'nor', 'not', 'only', 'own', 'same', 'so',
 'than', 'too', 'very', 'can', 'will', 'just', 'don', 'should', 'now'}