let data: any | null

function levenshtein(a:string, b:string) :number {
    var t = [], u, i, j, m = a.length, n = b.length;
    if (!m) { return n; }
    if (!n) { return m; }
    for (j = 0; j <= n; j++) { t[j] = j; }
    for (i = 1; i <= m; i++) {
        for (u = [i], j = 1; j <= n; j++) {
            u[j] = a[i - 1] === b[j - 1] ? t[j - 1] : Math.min(t[j - 1], t[j], u[j - 1]) + 1;
        } t = u;
    } return u[n];
}

function getMostSimilar(s: string): string {
    return Object
        .keys(data)
        .map(element => [element, levenshtein(s, element)] as [string, number])
        .reduce((best, current) => current[1] < best[1] ? current : best, [null, 999])[0]
}
