echo $1
jq '.version = .version+"'$1'"' package.json|sponge package.json
