

echo 'digraph {'
printf '\tordering=in\n'
for i in {0000..3000..1000}; do 
    printf '\t'$i' -> {'
    printf 000
    for i in {100..300..100}; do
        printf " "$i; 
    done;
    printf "}\n"
done;
for i in {000..300..100}; do 
    printf '\t'$i' -> {'
    printf 00
    for i in {10..30..10}; do
        printf " "$i; 
    done;
    printf "}\n"
done;
for i in {00..30..10}; do 
    printf '\t'$i' -> {'
    printf 0
    for i in {1..3}; do
        printf " "$i; 
    done;
    printf "}\n"
done;
for i in {0..3}; do
    printf "\t"$i"-> {}\n"; 
done;
echo '}'
