

echo 'digraph {'
printf '\tordering=in\n'
for i in {0000..9000..1000}; do 
    printf '\t'$i' -> {'
    printf 000
    for i in {100..900..100}; do
        printf " "$i; 
    done;
    printf "}\n"
done;
for i in {000..900..100}; do 
    printf '\t'$i' -> {'
    printf 00
    for i in {10..90..10}; do
        printf " "$i; 
    done;
    printf "}\n"
done;
for i in {00..90..10}; do 
    printf '\t'$i' -> {'
    printf 0
    for i in {1..9}; do
        printf " "$i; 
    done;
    printf "}\n"
done;
for i in {0..9}; do
    printf "\t"$i"-> {}\n"; 
done;
echo '}'
